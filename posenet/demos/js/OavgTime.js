var x = '/json/overall.json';

var injury = [];
var counts = [];
var shoulderTime, ankleTime;
var avgShoulderTime = [];
var avgAnkleTime = [];
var totalShoulder = 0;
var totalAnkle = 0;
var oAvgShoulder = 0;
var oAvgAnkle = 0;
var kS = 0;
var kA = 0;

$.getJSON( x, function( json ) {

	for (var i = 0; i < json.length; i++) {

  		if(json[i].patient.typeOfInjury == 'Shoulder Injury') {
  			var singleTimeShoulder = 0;
  			
  			for(j = 0; j < json[i].patient.session.length; j++) {
  				shoulderTime = json[i].patient.session[j].time;
  				singleTimeShoulder = singleTimeShoulder + shoulderTime ;
  			}
  			avgShoulderTime[kS] = singleTimeShoulder / json[i].patient.session.length;
  			// console.log('ks', kS);
  			//  console.log("singleTimeShoulder", singleTimeShoulder);
  			//   console.log('avgShoulderTime', avgShoulderTime);
  			kS++;
  			}

  		else if(json[i].patient.typeOfInjury == 'Ankle Injury') {
  			var singleAnkleTime = 0;

  			for(j = 0; j < json[i].patient.session.length; j++) {
  				ankleTime = json[i].patient.session[j].time;
  				singleAnkleTime = singleAnkleTime + ankleTime;
  			}

  			avgAnkleTime[i] = singleAnkleTime / json[i].patient.session.length;
  		} 

	}
	// console.log("length sholder", avgShoulderTime.length);

	for (i = 0; i < avgShoulderTime.length; i++) {
  	
  		totalShoulder += avgShoulderTime[i];
  	}
  	for (i = 0; i < avgAnkleTime.length; i++) {
  		
  		totalAnkle += avgAnkleTime[i];
  	}
  	oAvgShoulder = totalShoulder / kS;
  	oAvgAnkle = totalAnkle / avgAnkleTime.length;

	 // console.log("ankleTime" , ankleTime);
	 // console.log("shoulderTime", shoulderTime);
	 // console.log("avgAnkleTime", avgAnkleTime);
	 // console.log("oAvgShoulder", oAvgShoulder);
	 // console.log("oAvgAnkle", oAvgAnkle);
	 chartOTime();
 });

function chartOTime() {
	var dom = document.getElementById("oAvgTime");
  	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		title : {
	    	
	        text: 'Average Time Taken By Injury Type',
	        x:'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: "{b} : {c}%"
	    },
	    xAxis: {
	        name: 'Type of injury',
	        type: 'category',
	        data: ['Ankle Injury', 'Shoulder Injury'],
	    },
	    yAxis: {
	        name: 'Average Time Taken (seconds)',
	        type: 'value',
	    },
	    series: [{
	        data: [oAvgAnkle, oAvgShoulder],
	        color: ['#8B0000'],
	        type: 'bar',
	    }]
	};
	  
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}