var x = '/json/overall.json';

var avgPerformance= [];
var total = 0;
var oAvgPerformance = 0;
var notOAvgPerformance = 0;

$.getJSON( x, function( json ) {
  
	for (var i = 0; i < json.length; i++) {
       	var singleP = 0;
       	var sess = [];
		var accuracy = [];
            for (var j = 0; j < json[i].patient.session.length; j++) {
                sess.push(json[i].patient.session[j].sessionNum);
      			accuracy.push(json[i].patient.session[j].Accuracy);

      			singleP = (singleP + accuracy[j]) ;

            } 
            avgPerformance[i] = singleP / json[i].patient.session.length
            // console.log("wwss", singleP);
    }
 	console.log("dd" ,avgPerformance);
  //   console.log("ww", accuracy);
   for (var i = 0; i< avgPerformance.length;i++) {
   		total += avgPerformance[i];
   }
   oAvgPerformance = total / avgPerformance.length;
   notOAvgPerformance = 100 - oAvgPerformance;
   console.log("total average performance : ", oAvgPerformance);
   chartOperformance();
});

function chartOperformance() {
	var dom = document.getElementById("oPerform");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    title : {
	    	top: 80,
	        text: 'Overall Performance',
	        x:'center'
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'right',
	        data:['Accurate','Not Accurate'],
	        right: 10,
        	top: 200,
        	bottom: 20,
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {d}%"
	    },
	    series : [
	        {
	            name: 'Percentage',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:oAvgPerformance, name:'Accurate'},
	                {value:notOAvgPerformance, name:'Not Accurate'},

	            ],
	            color: ['#008B8B','#40E0D0'],
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