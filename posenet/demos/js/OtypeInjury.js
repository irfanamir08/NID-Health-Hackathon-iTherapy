var x = '/json/overall.json';

var injury = [];
var counts = [];
$.getJSON( x, function( json ) {

  for (var i = 0; i < json.length; i++) {
    injury.push(json[i].patient.typeOfInjury);
  }
  console.log("M" , injury);



  for (var i = 0; i < injury.length; i++) {
    counts[injury[i]] = 1 + (counts[injury[i]] || 0);
}

  console.log("Mcc" , counts);


  chartOType();

 });

function chartOType () {
  var dom = document.getElementById("oType");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title : {

          text: 'Type Of Injuries',
          x:'center'
      },
      xAxis: {
        name: 'Type of injury',
          type: 'category',
          data: ['Ankle Injury', 'Shoulder Injury'],
      },
      yAxis: {
        name: 'Number of Cases',
          type: 'value',

      },
      series: [{
          data: [counts['Ankle Injury'], counts['Shoulder Injury']],
          type: 'bar',
      }]
  };

  if (option && typeof option === "object") {
      myChart.setOption(option, true);
  }
}
