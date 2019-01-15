// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/oAll.js":[function(require,module,exports) {
var json = [{
  "patient": {
    "name": "Matt Dowzell",
    "DOB": "1/1/1956",
    "medID": "59-337-6629",
    "gender": "Male",
    "age": 65,
    "typeOfInjury": "Anterier Cruciate Ligament",
    "startingDate": "6/10/2018",
    "session": [{
      "sessionNum": 1,
      "Accuracy": 1,
      "time": 67,
      "onTime": 1
    }, {
      "sessionNum": 2,
      "Accuracy": 25,
      "time": 36,
      "onTime": 0
    }, {
      "sessionNum": 3,
      "Accuracy": 80,
      "time": 24,
      "onTime": 1
    }, {
      "sessionNum": 4,
      "Accuracy": 71,
      "time": 30,
      "onTime": 1
    }, {
      "sessionNum": 5,
      "Accuracy": 52,
      "time": 26,
      "onTime": 0
    }, {
      "sessionNum": 6,
      "Accuracy": 15,
      "time": 69,
      "onTime": 0
    }, {
      "sessionNum": 7,
      "Accuracy": 64,
      "time": 14,
      "onTime": 1
    }, {
      "sessionNum": 8,
      "Accuracy": 21,
      "time": 73,
      "onTime": 1
    }, {
      "sessionNum": 9,
      "Accuracy": 61,
      "time": 28,
      "onTime": 1
    }, {
      "sessionNum": 10,
      "Accuracy": 41,
      "time": 73,
      "onTime": 1
    }],
    "attendanceTotalSessions": 10.0
  }
}, {
  "patient": {
    "name": "Nealon Jossel",
    "DOB": "1/31/1966",
    "medID": "98-518-6324",
    "gender": "Male",
    "age": 62,
    "typeOfInjury": "Arm Injury",
    "startingDate": "9/19/2018",
    "session": [{
      "sessionNum": 1,
      "Accuracy": 3,
      "time": 98,
      "onTime": 1
    }, {
      "sessionNum": 2,
      "Accuracy": 39,
      "time": 35,
      "onTime": 1
    }, {
      "sessionNum": 3,
      "Accuracy": 25,
      "time": 23,
      "onTime": 0
    }, {
      "sessionNum": 4,
      "Accuracy": 69,
      "time": 71,
      "onTime": 0
    }, {
      "sessionNum": 5,
      "Accuracy": 88,
      "time": 55,
      "onTime": 1
    }, {
      "sessionNum": 6,
      "Accuracy": 98,
      "time": 50,
      "onTime": 1
    }, {
      "sessionNum": 7,
      "Accuracy": 24,
      "time": 18,
      "onTime": 1
    }, {
      "sessionNum": 8,
      "Accuracy": 44,
      "time": 7,
      "onTime": 1
    }, {
      "sessionNum": 9,
      "Accuracy": 78,
      "time": 46,
      "onTime": 1
    }, {
      "sessionNum": 10,
      "Accuracy": 1,
      "time": 81,
      "onTime": 0
    }],
    "attendanceTotalSessions": 10.0
  }
}, {
  "patient": {
    "name": "Francesca Davana",
    "DOB": "10/1/1950",
    "medID": "78-023-2879",
    "gender": "Female",
    "age": 47,
    "typeOfInjury": "Arm Injury",
    "startingDate": "1/23/2018",
    "session": [{
      "sessionNum": 1,
      "Accuracy": 10,
      "time": 85,
      "onTime": 0
    }, {
      "sessionNum": 2,
      "Accuracy": 63,
      "time": 88,
      "onTime": 1
    }, {
      "sessionNum": 3,
      "Accuracy": 53,
      "time": 39,
      "onTime": 1
    }, {
      "sessionNum": 4,
      "Accuracy": 65,
      "time": 20,
      "onTime": 0
    }, {
      "sessionNum": 5,
      "Accuracy": 25,
      "time": 33,
      "onTime": 1
    }, {
      "sessionNum": 6,
      "Accuracy": 45,
      "time": 15,
      "onTime": 1
    }, {
      "sessionNum": 7,
      "Accuracy": 18,
      "time": 61,
      "onTime": 0
    }, {
      "sessionNum": 8,
      "Accuracy": 11,
      "time": 90,
      "onTime": 1
    }, {
      "sessionNum": 9,
      "Accuracy": 82,
      "time": 26,
      "onTime": 0
    }, {
      "sessionNum": 10,
      "Accuracy": 26,
      "time": 100,
      "onTime": 0
    }],
    "attendanceTotalSessions": 10.0
  }
}, {
  "patient": {
    "name": "Cosimo Hickford",
    "DOB": "8/22/1955",
    "medID": "10-667-9159",
    "gender": "Male",
    "age": 56,
    "typeOfInjury": "Arm Injury",
    "startingDate": "3/24/2018",
    "session": [{
      "sessionNum": 1,
      "Accuracy": 17,
      "time": 48,
      "onTime": 0
    }, {
      "sessionNum": 2,
      "Accuracy": 62,
      "time": 58,
      "onTime": 0
    }, {
      "sessionNum": 3,
      "Accuracy": 49,
      "time": 15,
      "onTime": 0
    }, {
      "sessionNum": 4,
      "Accuracy": 2,
      "time": 5,
      "onTime": 0
    }, {
      "sessionNum": 5,
      "Accuracy": 46,
      "time": 59,
      "onTime": 1
    }, {
      "sessionNum": 6,
      "Accuracy": 32,
      "time": 78,
      "onTime": 0
    }, {
      "sessionNum": 7,
      "Accuracy": 62,
      "time": 64,
      "onTime": 0
    }, {
      "sessionNum": 8,
      "Accuracy": 84,
      "time": 98,
      "onTime": 1
    }, {
      "sessionNum": 9,
      "Accuracy": 65,
      "time": 81,
      "onTime": 1
    }, {
      "sessionNum": 10,
      "Accuracy": 89,
      "time": 84,
      "onTime": 0
    }],
    "attendanceTotalSessions": 10.0
  }
}, {
  "patient": {
    "name": "Clint Cajkler",
    "DOB": "12/12/1961",
    "medID": "45-735-7754",
    "gender": "Male",
    "age": 57,
    "typeOfInjury": "Arm Injury",
    "startingDate": "4/10/2018",
    "session": [{
      "sessionNum": 1,
      "Accuracy": 41,
      "time": 55,
      "onTime": 1
    }, {
      "sessionNum": 2,
      "Accuracy": 86,
      "time": 65,
      "onTime": 0
    }, {
      "sessionNum": 3,
      "Accuracy": 59,
      "time": 74,
      "onTime": 1
    }, {
      "sessionNum": 4,
      "Accuracy": 58,
      "time": 12,
      "onTime": 0
    }, {
      "sessionNum": 5,
      "Accuracy": 84,
      "time": 14,
      "onTime": 0
    }, {
      "sessionNum": 6,
      "Accuracy": 21,
      "time": 39,
      "onTime": 1
    }, {
      "sessionNum": 7,
      "Accuracy": 63,
      "time": 58,
      "onTime": 0
    }, {
      "sessionNum": 8,
      "Accuracy": 83,
      "time": 14,
      "onTime": 1
    }, {
      "sessionNum": 9,
      "Accuracy": 8,
      "time": 64,
      "onTime": 0
    }, {
      "sessionNum": 10,
      "Accuracy": 62,
      "time": 24,
      "onTime": 0
    }],
    "attendanceTotalSessions": 10.0
  }
}];
var countM = 0;
var countF = 0;

for (var i = 0; i < json.length; i++) {
  if (json[i].patient.gender == 'Male') countM++;else countF++;
}

console.log("M", countM);
console.log("F", countF);
chartOGender();

function chartOGender() {
  var dom = document.getElementById("oGender");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Gender',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['Female', 'Male'],
      right: 10,
      top: 100,
      bottom: 20
    },
    series: [{
      name: 'Total',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      name: 'Number of Patient',
      type: 'pie',
      radius: ['40%', '55%'],
      label: {
        normal: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{per|{c}}  {d}% ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          shadowBlur: 3,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowColor: '#999',
          padding: [0, 7],
          rich: {
            a: {
              color: '#000000',
              lineHeight: 22,
              align: 'center'
            },
            // abg: {
            //     backgroundColor: '#333',
            //     width: '100%',
            //     align: 'right',
            //     height: 22,
            //     borderRadius: [4, 4, 0, 0]
            // },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 16,
              lineHeight: 33,
              color: '#000000'
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      data: [{
        value: countF,
        name: 'Female'
      }, {
        value: countM,
        name: 'Male'
      }],
      color: ['#B0E0E6', '#4169E1']
    }]
  };
  ;

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
} // Overall Age-----------------------------------------------------------------


var birth = [];
var tahunSekarang = new Date();
var diaLahir;
var age = [];
var count30 = 0,
    count40 = 0,
    count50 = 0,
    count60 = 0,
    count70 = 0;

for (var i = 0; i < json.length; i++) {
  birth.push(json[i].patient.DOB);
  diaLahir = birth[i].substr(birth[i].length - 4);
  age[i] = tahunSekarang.getFullYear() - diaLahir;
  if (age[i] < 40) count30++;else if (age[i] >= 40 && age[i] < 50) count40++;else if (age[i] >= 50 && age[i] < 60) count50++;else if (age[i] >= 60 && age[i] < 70) count60++;else count70++;
}

chartOAge();

function chartOAge() {
  var agedom = document.getElementById("oAge");
  var ageChart = echarts.init(agedom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Age Categories',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} patient(s)"
    },
    xAxis: {
      name: 'Age',
      type: 'category',
      data: ['< 40', '40 - 49', '50 - 59', '60 - 69', '> 70']
    },
    yAxis: {
      name: 'Number of Patient',
      type: 'value'
    },
    series: [{
      data: [count30, count40, count50, count60, count70],
      color: ['#9400D3', '#BA55D3'],
      type: 'bar'
    }]
  };

  if (option && typeof option === "object") {
    ageChart.setOption(option, true);
  }
} //Overall Attendance-----------------------------------------------------------


var percent = 0;
var totalP = [];
var totalPercent = 0;
var avgP = 0;
var avgNP = 0;

for (var i = 0; i < json.length; i++) {
  var totalOnTime = 0;

  for (var j = 0; j < json[i].patient.session.length; j++) {
    totalOnTime = totalOnTime + json[i].patient.session[j].onTime;
  }

  percent = totalOnTime / json[i].patient.session.length * 100;
  totalP[i] = percent; // console.log(totalOnTime);
  // console.log(percent);
  // console.log(totalP);
}

for (var i = 0; i < totalP.length; i++) {
  totalPercent = totalPercent + totalP[i];
  avgP = totalPercent / totalP.length;
  avgNP = 100 - avgP;
} // console.log("euf : " ,avgP);


oAttend();

function oAttend() {
  var dom = document.getElementById("oAtt");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Overall Attendance',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: ['OnTime', 'Not OnTime'],
      right: 20,
      top: 100,
      bottom: 20
    },
    series: [{
      name: 'Total',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
        value: avgP,
        name: 'OnTime'
      }, {
        value: avgNP,
        name: 'Not OnTime'
      }],
      color: ['#006400', '#7FFF00'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  ;

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
} //Overall Performance-----------------------------------------------------------


var avgPerformance = [];
var total = 0;
var oAvgPerformance = 0;
var notOAvgPerformance = 0;

for (var i = 0; i < json.length; i++) {
  var singleP = 0;
  var sess = [];
  var accuracy = [];

  for (var j = 0; j < json[i].patient.session.length; j++) {
    sess.push(json[i].patient.session[j].sessionNum);
    accuracy.push(json[i].patient.session[j].Accuracy);
    singleP = singleP + accuracy[j];
  }

  avgPerformance[i] = singleP / json[i].patient.session.length; // console.log("wwss", singleP);
}

console.log("dd", avgPerformance); //   console.log("ww", accuracy);

for (var i = 0; i < avgPerformance.length; i++) {
  total += avgPerformance[i];
}

oAvgPerformance = total / avgPerformance.length;
notOAvgPerformance = 100 - oAvgPerformance;
console.log("total average performance : ", oAvgPerformance);
chartOperformance();

function chartOperformance() {
  var dom = document.getElementById("oPerform");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Overall Performance',
      x: 'center'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['Accurate', 'Not Accurate'],
      right: 20,
      top: 100,
      bottom: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {d}%"
    },
    series: [{
      name: 'Percentage',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
        value: oAvgPerformance,
        name: 'Accurate'
      }, {
        value: notOAvgPerformance,
        name: 'Not Accurate'
      }],
      color: ['#008B8B', '#40E0D0'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  ;

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
} //Overall Time-----------------------------------------------------------


var injury = [];
var counts = [];
var armTime, aclTime;
var avgArmTime = [];
var avgAclTime = [];
var totalArm = 0;
var totalAcl = 0;
var oAvgArm = 0;
var oAvgAcl = 0;
var kS = 0;
var kA = 0;

for (var i = 0; i < json.length; i++) {
  if (json[i].patient.typeOfInjury == 'Arm Injury') {
    var singleArmTime = 0;

    for (j = 0; j < json[i].patient.session.length; j++) {
      armTime = json[i].patient.session[j].time;
      singleArmTime = singleArmTime + armTime;
    }

    avgArmTime[kS] = singleArmTime / json[i].patient.session.length; // console.log('ks', kS);
    //  console.log("singleArmTime", singleArmTime);
    //   console.log('avgArmTime', avgArmTime);

    kS++;
  } else if (json[i].patient.typeOfInjury == 'Anterier Cruciate Ligament') {
    var singleAclTime = 0;

    for (j = 0; j < json[i].patient.session.length; j++) {
      aclTime = json[i].patient.session[j].time;
      singleAclTime = singleAclTime + aclTime;
    }

    avgAclTime[i] = singleAclTime / json[i].patient.session.length;
  }
} // console.log("length sholder", avgArmTime.length);


for (i = 0; i < avgArmTime.length; i++) {
  totalArm += avgArmTime[i];
}

for (i = 0; i < avgAclTime.length; i++) {
  totalAcl += avgAclTime[i];
}

oAvgArm = totalArm / kS;
oAvgAcl = totalAcl / avgAclTime.length; // console.log("aclTime" , aclTime);
// console.log("armTime", armTime);
// console.log("avgAclTime", avgAclTime);
// console.log("oAvgArm", oAvgArm);
// console.log("oAvgAcl", oAvgAcl);

chartOTime();

function chartOTime() {
  var dom = document.getElementById("oAvgTime");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Average Time Taken By Injury Type',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} second(s)"
    },
    xAxis: {
      name: 'Type of injury',
      type: 'category',
      data: ['Anterier Cruciate Ligament', 'Arm Injury']
    },
    yAxis: {
      name: 'Average Time Taken (seconds)',
      type: 'value'
    },
    series: [{
      data: [oAvgAcl, oAvgArm],
      color: ['#8B0000'],
      type: 'bar'
    }]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
} //Overall Injury-----------------------------------------------------------


var injury = [];
var counts = [];

for (var i = 0; i < json.length; i++) {
  injury.push(json[i].patient.typeOfInjury);
}

console.log("M", injury);

for (var i = 0; i < injury.length; i++) {
  counts[injury[i]] = 1 + (counts[injury[i]] || 0);
}

console.log("Mcc", counts);
chartOType();

function chartOType() {
  var dom = document.getElementById("oType");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
    title: {
      text: 'Type Of Injuries',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} Case(s)"
    },
    xAxis: {
      name: 'Type of injury',
      type: 'category',
      data: ['Anterier Cruciate Ligament', 'Arm Injury']
    },
    yAxis: {
      name: 'Number of Cases',
      type: 'value'
    },
    series: [{
      data: [counts['Anterier Cruciate Ligament'], counts['Arm Injury']],
      type: 'bar'
    }]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
},{}]},{},["js/oAll.js"], null)
//# sourceMappingURL=/oAll.fd3318f9.map