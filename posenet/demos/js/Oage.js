var x = '/json/overall.json';

var birth = [];
var tahunSekarang = new Date();
var diaLahir;
var age = [];
var count30 = 0, count40 = 0, count50 = 0, count60 = 0, count70 = 0;

$.getJSON( x, function( json ) {

	for (var i = 0; i < json.length; i++) {
		birth.push(json[i].patient.DOB);
		diaLahir = birth[i].substr(birth[i].length - 4);
		age[i] = tahunSekarang.getFullYear() - diaLahir;

		if(age[i] < 40)
			count30++;
		else if(age[i] >= 40 && age[i] < 50)
			count40++;
		else if(age[i] >= 50 && age[i] < 60)
			count50++;
		else if(age[i] >= 60 && age[i] < 70)
			count60++;
		else
			count70++;
	}

	

	console.log(age);
	console.log(count30);
	console.log(count40);
	console.log(count50);
	console.log(count60);
	console.log(count70);

	console.log("F" , birth);
	chartOAge();
 });

function chartOAge () {
  var dom = document.getElementById("oAge");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
	title : {
	    	
	        text: 'Age Categories',
	        x:'center'
	    },
      xAxis: {
        name: 'Age Category',
          type: 'category',
          data: ['< 40', '40 - 49', '50 - 59', '60 - 69', '> 70'],

      },
      yAxis: {
        name: 'Number of Patient',
          type: 'value',

      },
      series: [{
          data: [count30, count40, count50, count60, count70],
          color: ['#9400D3', '#BA55D3'],
          type: 'bar',
      
      }]
  };
  
  if (option && typeof option === "object") {
      myChart.setOption(option, true);
  }
}
