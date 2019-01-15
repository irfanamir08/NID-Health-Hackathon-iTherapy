var x = '/json/overall.json';

var searching = '78-023-2879';
var sess = [];
var accuracy = [];


$.getJSON( x, function( json ) {
  
  for (var i = 0; i < json.length; i++) {
        
        if(json[i].patient.medID == searching) {
            for (var j = 0; j < json[i].patient.session.length; j++) {
                sess.push(json[i].patient.session[j].sessionNum);
                accuracy.push(json[i].patient.session[j].Accuracy);
            }
        } 
    }
    chartPerformance();
});

function chartPerformance() {
    var dom = document.getElementById("perform");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
      title:{
            text: 'Performance Per Session',
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
            name: "Session",
            type: 'category',
            data: sess
        },
        yAxis: {
            name: 'Accuracy (%)',
            type: 'value'
        },
        series: [{
            data: accuracy,
            type: 'line'
        }]
    }     
    
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
