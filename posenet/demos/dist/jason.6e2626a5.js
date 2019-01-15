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
})({"js/jason.js":[function(require,module,exports) {
var json = [{
  "patient": {
    "name": "Matt Dowzell",
    "DOB": "1/1/1956",
    "medID": "59-337-6629",
    "gender": "Male",
    "age": 65,
    "typeOfInjury": "Ankle Injury",
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
    "typeOfInjury": "Shoulder Injury",
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
    "typeOfInjury": "Shoulder Injury",
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
    "typeOfInjury": "Shoulder Injury",
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
    "typeOfInjury": "Shoulder Injury",
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
},{}]},{},["js/jason.js"], null)
//# sourceMappingURL=/jason.6e2626a5.map