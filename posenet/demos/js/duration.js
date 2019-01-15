var x = '/json/overall.json';

var searching = '78-023-2879';
var duration = [];
var sess = [];

$.getJSON( x, function( json ) {
  
  for (var i = 0; i < json.length; i++) {
        
        if(json[i].patient.medID == searching) {
            for (var j = 0; j < json[i].patient.session.length; j++) {
                sess.push(json[i].patient.session[j].sessionNum);
                duration.push(json[i].patient.session[j].time);
            }
        } 
    }
    chartDuration();
});

function chartDuration () {
	var dom = document.getElementById("dura");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		title:{
            text: 'Time Taken Per Session',
            x: 'center'

      },
      tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        },
	        formatter: "Session {b} : {c}%"
	    },
	    xAxis: {
	    	name: 'Session',
	        type: 'category',
	        data: sess
	    },
	    yAxis: {
	    	name: 'Time (seconds)',
	        type: 'value'
	    },
	    series: [{
	        data: duration,
	        type: 'bar',	
	        color: '#FA8072'
	    }]
	};
	
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}
