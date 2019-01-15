
var newValueX, newValueY, newValueZ;
var time = String(new Date());

 const socket = io.connect("/");



var gameInstance = UnityLoader.instantiate("gameContainer", "Build/webgl-canvas.json", {
  onProgress: UnityProgress
});


socket.on('fromServer', function(data) {
  console.log('server says ' + data.msg);
});

socket.on('dataFromDevice', function(data) {  //client guy

  var w = parseFloat(data.w);
  var x = parseFloat(data.x);
  var y = parseFloat(data.y);
  var z = parseFloat(data.z);
  var w2 = parseFloat(data.w2);
  var x2 = parseFloat(data.x2);
  var y2 = parseFloat(data.y2);
  var z2 = parseFloat(data.z2);

  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftShoulderW", w);
  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftShoulderX", x);
  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftShoulderY", y);
  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftShoulderZ", z);
  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftForeArmW", w2);
  gameInstance.SendMessage("RokokoGuy_LeftForeArm", "ctrlLeftForeArmX", x2);
  gameInstance.SendMessage("RokokoGuy_LeftForeArm", "ctrlLeftForeArmY", y2);
  gameInstance.SendMessage("RokokoGuy_LeftForeArm", "ctrlLeftForeArmZ", z2);


});


socket.on('dataFromDatabase', function(data) {  //trainer guy

  var dw = parseFloat(data.w);
  var dx = parseFloat(data.x);
  var dy = parseFloat(data.y);
  var dz = parseFloat(data.z);
  var dw2 = parseFloat(data.w2);
  var dx2 = parseFloat(data.x2);
  var dy2 = parseFloat(data.y2);
  var z2 = parseFloat(data.z2);

// RokokoGuy1 is for data from database---------------------------------
  gameInstance.SendMessage("RokokoGuy_LeftArm", "ctrlLeftShoulderW", dw);
  gameInstance.SendMessage("RokokoGuy1_LeftArm", "ctrlLeftShoulderX", dx);
  gameInstance.SendMessage("RokokoGuy1_LeftArm", "ctrlLeftShoulderY", dy);
  gameInstance.SendMessage("RokokoGuy1_LeftArm", "ctrlLeftShoulderZ", dz);
  gameInstance.SendMessage("RokokoGuy_LeftForeArm", "ctrlLeftForeArmW", dx2);
  gameInstance.SendMessage("RokokoGuy1_LeftForeArm", "ctrlLeftForeArmX", dx2);
  gameInstance.SendMessage("RokokoGuy1_LeftForeArm", "ctrlLeftForeArmY", dy2);
  gameInstance.SendMessage("RokokoGuy1_LeftForeArm", "ctrlLeftForeArmZ", dz2);

});

(function($){
 $(function(){

   $('.sidenav').sidenav();

 }); // end of document ready
})(jQuery); // end of jQuery name space
