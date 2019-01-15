var x = '/json/overall.json';

var searching = '78-023-2879';
var duration = [];
var sess = [];
var accuracy = [];
var p;
var t;


$.getJSON( x, function( json ) {
  
  for (var i = 0; i < json.length; i++) {
        
        if(json[i].patient.medID == searching) {
            for (var j = 0; j < json[i].patient.session.length; j++) {
                sess.push(json[i].patient.session[j].sessionNum);
                duration.push(json[i].patient.session[j].time);
                accuracy.push(json[i].patient.session[j].Accuracy);
            }
        } 
    }
    chartTimex();
});

function chartTimex() {
	var dom = document.getElementById("timex");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	app.title = 'individual performance';

	option = {
		title: {
        text: 'Performance x Time',
        x: 'center'
    	},
	    tooltip: {
	        trigger: 'axis',
	        formatter: "{a} : {c} seconds <br> accuracy : {c1}%"
	    },
	    
	    // toolbox: {
	    //     feature: {
	    //         dataView: {show: true, readOnly: false},
	    //         magicType: {show: true, type: ['line', 'bar']},
	    //         restore: {show: true},
	    //         saveAsImage: {show: true}
	    //     }
	    // },
	    legend: {
	        data:['Session','Accuracy']
	    },
	    xAxis: [
	        {
	        	name:'Session',
	            type: 'category',
	            data: sess,
	            axisPointer: {
	                type: 'shadow'
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: 'Time (seconds)'
	          
	        },
	        {
	            type: 'value',
	            name: 'Accuracy (%)'
	            
	        }
	    ],
	    series: [
	        {
	            name:'duration',
	            type:'bar',
	            data:duration,
	            color:'#AFEEEE'
	        },
	        
	        {
	            name:'accuracy ',
	            type:'line',
	            yAxisIndex: 1,
	            data:accuracy
	        }
	    ]
	};
	;
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}