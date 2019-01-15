var x = '/json/overall.json';

var percent = 0;
var totalP = [];
var totalPercent = 0;
var avgP = 0;
var avgNP = 0;

$.getJSON( x, function( json ) {
  
	for (var i = 0; i < json.length; i++) {
        var totalOnTime = 0;
            for (var j = 0; j < json[i].patient.session.length; j++) {
                totalOnTime = totalOnTime + json[i].patient.session[j].onTime;
                
            }
        percent = totalOnTime / json[i].patient.session.length * 100;
        totalP[i] = percent;

        // console.log(totalOnTime);
        // console.log(percent);
        // console.log(totalP);
    }
    for (var i = 0; i < totalP.length; i++) {

    	totalPercent = totalPercent + totalP[i];
    	avgP = totalPercent / totalP.length;
    	avgNP = 100 - avgP;

    }
    // console.log("euf : " ,avgP);
    oAttend();
});



function oAttend() {
    var dom = document.getElementById("oAtt");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    title : {
	    	top: 80,
	        text: 'Overall Attendance',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'right',
	        data: ['OnTime','Not OnTime'],
	        right: 10,
        	top: 200,
        	bottom: 20,
	    },
	    series : [
	        {
	            name: 'Total',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:avgP, name:'OnTime'},
	                {value:avgNP, name:'Not OnTime'}
	            ],
	            color: ['#006400', '#7FFF00'],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	;
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	}

