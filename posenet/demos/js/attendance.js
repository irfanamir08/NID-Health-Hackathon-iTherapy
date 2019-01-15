var x = '/json/overall.json';

var searching = '78-023-2879';
var percent = 0;
var nPercent = 0;
var countSession = 0;
var totalOnTime = 0;

$.getJSON( x, function( json ) {
  
	for (var i = 0; i < json.length; i++) {
        
        if(json[i].patient.medID == searching) {
            for (var j = 0; j < json[i].patient.session.length; j++) {
                totalOnTime = totalOnTime + json[i].patient.session[j].onTime;
                countSession++;
            }
        } 
    }
    percent = totalOnTime / countSession * 100;
    nPercent = 100 - percent;

        console.log(totalOnTime);
        console.log(percent);
        console.log(countSession);  

        chartAttend();
});

function chartAttend() {
    var dom = document.getElementById("att");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title : {
            top: 80,
            text: 'Attendance',
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
                    {value:percent, name:'OnTime'},
                    {value:nPercent, name:'Not OnTime'}
                ],
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