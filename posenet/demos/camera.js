/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posenet from '@tensorflow-models/posenet';
import dat from 'dat.gui';
import Stats from 'stats.js';
import jQuery from 'jquery';
import $ from 'jquery';
import dataAvatar from './data.js';

import {drawBoundingBox, drawKeypoints, drawSkeleton, drawAvatarKeypoints, drawAvatarSkeleton, calculatePoints} from './demo_util';

const videoWidth = 600;
const videoHeight = 500;
const stats = new Stats();

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

var avatarSize = dataAvatar.keypoints.length-1;
console.log(avatarSize);
var points = 0;
var avatarKeypoints= "";
var avatarDrawKeypoints = '';
var dummyPoints = {keypoints :
[
  {"score":0.9988160729408264,"part":"nose","position":{"x":67.23175970740796,"y":90.09678531979131}},
  {"score":0.9883550405502319,"part":"leftEye","position":{"x":76.2708495644962,"y":83.62841705069009}},
  {"score":0.9942510724067688,"part":"rightEye","position":{"x":57.82758686369265,"y":82.69819778030839}},
  {"score":0.6593484729528427,"part":"leftEar","position":{"x":83.33665062399471,"y":93.02566407627091}},
  {"score":0.9555402994155884,"part":"rightEar","position":{"x":39.381438885593084,"y":89.45007344004524}},
  {"score":0.9766741991043091,"part":"leftShoulder","position":{"x":85.80394731673401,"y":148.8239824524559}},
  {"score":0.9970284700393677,"part":"rightShoulder","position":{"x":19.11589414603157,"y":137.61058536307942}},
  {"score":0.9949591159820557,"part":"leftElbow","position":{"x":95.18956280084629,"y":211.0144547901708}},
  {"score":0.9960078001022339,"part":"rightElbow","position":{"x":2.4524255607367387,"y":205.46688133255577}},
  {"score":0.9892753958702087,"part":"leftWrist","position":{"x":124.09537358267497,"y":258.28582122612795}},
  {"score":0.9824727773666382,"part":"rightWrist","position":{"x":0.7017956885499524,"y":281.2457381442375}},
  {"score":0.9323726296424866,"part":"leftHip","position":{"x":79.23469510457919,"y":261.51491695419884}},
  {"score":0.8953860998153687,"part":"rightHip","position":{"x":42.800689486071306,"y":264.10953385206676}},
  {"score":0.832287609577179,"part":"leftKnee","position":{"x":74.23846102915833,"y":354.6010824654607}},
  {"score":0.8700578808784485,"part":"rightKnee","position":{"x":78.84483865388124,"y":356.22903123436134}},
  {"score":0.8607901334762573,"part":"leftAnkle","position":{"x":64.46113673048448,"y":457.18758135910355}},
  {"score":0.8718212246894836,"part":"rightAnkle","position":{"x":61.31319042720596,"y":460.9203556266564}}
]};

avatarDrawKeypoints = dummyPoints.keypoints;
// calculate showPoints
// $.getJSON( "dummy.json", function( data ) {
//   console.log("data in getjson", data);
//   avatarKeypoints = data;
// });
// console.log("global data : " , avatarKeypoints);

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}
async function stopVideo() {
  const video = await setupCamera();
  video.stop();

  if (video) {
     video.getTracks().forEach(function (track) { track.stop(); });
   }

  //return video;
}


var guiState = {
    algorithm: 'multi-pose',
    input: {
      mobileNetArchitecture: isMobile() ? '0.50' : '0.75',
      outputStride: 16,
      imageScaleFactor: 0.5,
    },
  singlePoseDetection: {
    minPartConfidence: 0.5,
    minPoseConfidence: 0.7,
  },
  multiPoseDetection: {
    minPoseConfidence: 0.7,
    minPartConfidence: 0.5,
    scoreThreshold: 0.5,
    nmsRadius: 20.0,
    maxDetections: 15,
  },
  showKeypoints: true,
  showSkeleton: true,
  showBoundingBox: false,
  visualizeOutputs: {
    part: 0,
    showHeatmap: false,
    showOffsets: false,
    showDisplacements: false,
  },
    output: {
      showVideo: true,
      showSkeleton: true,
      showPoints: true,
      showBoundingBox: false,
      drawAvatar: false,
    },
    net: null,
};

var recKeypoints = { keypoints : []};

$("#stop").click(function()
{
  guiState.output.drawAvatar = false;
  guiState.output.showVideo = false;
  stopVideo();
  guiState.output.showVideo = true;
  loadVideo();

});

$("#start").click(function()
{
  // guiState.output.showVideo = true;
  // loadVideo();
  //draw drawAvatarSkeleton
  guiState.output.drawAvatar = true;
  // Animation
  // var avatarIndex = 0;
  // setInterval(function() {
  //   console.log("imported avatar data : ", dataAvatar.keypoints[avatarIndex][0]);
  //   avatarDrawKeypoints = dataAvatar.keypoints[avatarIndex][0];
  //   avatarIndex++;
  // }, 2000);

  avatarDrawKeypoints = dataAvatar.keypoints[points][0];

  var temp = (points+1).toString() +" / " + (avatarSize+1).toString();
  $("#rep").text(temp);
});

/**
 * Sets up a frames per second panel on the top-left of the window
 */
function setupFPS() {
  stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');

  // since images are being fed from a webcam
  const flipHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetectionFrame() {
    if (guiState.changeToArchitecture) {
      // Important to purge variables and free up GPU memory
      guiState.net.dispose();

      // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01
      // version
      guiState.net = await posenet.load(+guiState.changeToArchitecture);

      guiState.changeToArchitecture = null;
    }

    // Begin monitoring code for frames per second
    stats.begin();

    // Scale an image down to a certain factor. Too large of an image will slow
    // down the GPU
    const imageScaleFactor = guiState.input.imageScaleFactor;
    const outputStride = +guiState.input.outputStride;

    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;
    switch (guiState.algorithm) {
      case 'single-pose':
        const pose = await guiState.net.estimateSinglePose(
            video, imageScaleFactor, flipHorizontal, outputStride);
        poses.push(pose);

        minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;
        break;
      case 'multi-pose':
        poses = await guiState.net.estimateMultiplePoses(
            video, imageScaleFactor, flipHorizontal, outputStride,
            guiState.multiPoseDetection.maxPoseDetections,
            guiState.multiPoseDetection.minPartConfidence,
            guiState.multiPoseDetection.nmsRadius);

        minPoseConfidence = +guiState.multiPoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.multiPoseDetection.minPartConfidence;
        break;
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    // kat sini START STOP nnt
// guiState.output.showVideo
    if (guiState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      // console.log("dummyPoints", dummyPoints);
      if(guiState.output.drawAvatar)
      {
        drawAvatarKeypoints(avatarDrawKeypoints, minPartConfidence, ctx);
        drawAvatarSkeleton(avatarDrawKeypoints, minPartConfidence, ctx);
      }
    }

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    // TODO: kat sini matchkan points
    //16 dummy showPoints
    // var dumPoints =


    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        // console.log("poses keypoints: " , poses);
        // avatarKeypoints = keypoints;
        // recKeypoints.keypoints.push(keypoints);
        if (guiState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx);
        }
        if (guiState.output.showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, ctx);
        }
        if (guiState.output.showBoundingBox) {
          drawBoundingBox(keypoints, ctx);
        }

        if(guiState.output.drawAvatar)
        {
          var userPoints = calculatePoints(keypoints, avatarDrawKeypoints);

          //Calculate dumPoints
          if(userPoints == 12)
          {
            console.log(" user points : ", keypoints);
            console.log(" avatar points : ", avatarDrawKeypoints);
            var temp = (points+1).toString() +" / " + (avatarSize+1).toString();
            $("#rep").text(temp);
            if(points < avatarSize)
            {
              points++;
              avatarDrawKeypoints = dataAvatar.keypoints[points][0];
            }
            else
            {
              guiState.output.drawAvatar = false;
            }

          }
        }

      }
    });

    // End monitoring code for frames per second
    stats.end();

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
export async function bindPage() {
  // Load the PoseNet model weights with architecture 0.75
  const net = await posenet.load(0.75);

  // document.getElementById('loading').style.display = 'none';
  document.getElementById('main').style.display = 'block';

  let video;

  try {
    video = await loadVideo();
  } catch (e)
  {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' +
        'or this device does not have a camera';
    info.style.display = 'block';
    throw e;
  }

  // setupGui([], net);
  guiState.net = net;
  // setupFPS();
  detectPoseInRealTime(video, net);




//record data
  // var counter = 0;
  // setInterval(function() {
  //   counter++;
  //   if (counter == 10 ){
  //     var json = JSON.stringify(recKeypoints);
  //     console.log("total movement : ", recKeypoints.keypoints.length)
  //     console.log("complete movement : ", json);
  //   }
  //   else {
  //     recKeypoints.keypoints.push([avatarKeypoints]);
  //     console.log("Keypoints in 2 sec : ", recKeypoints);
  //   }
  //
  //   //your code to be executed after 1 second
  // }, 2000);


}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
bindPage();
