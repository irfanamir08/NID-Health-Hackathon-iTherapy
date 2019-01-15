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
})({"js/plugins.js":[function(require,module,exports) {
/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 2.2
  Author: GeeksLabs
  Author URL: http://www.themeforest.net/user/geekslabs
================================================================================*/
$(function () {
  "use strict";

  var window_width = $(window).width();
  /*Preloader*/

  $(window).load(function () {
    setTimeout(function () {
      $('body').addClass('loaded');
    }, 200);
  }); // Search class for focus

  $('.header-search-input').focus(function () {
    $(this).parent('div').addClass('header-search-wrapper-focus');
  }).blur(function () {
    $(this).parent('div').removeClass('header-search-wrapper-focus');
  }); // Check first if any of the task is checked

  $('#task-card input:checkbox').each(function () {
    checkbox_check(this);
  }); // Task check box

  $('#task-card input:checkbox').change(function () {
    checkbox_check(this);
  }); // Check Uncheck function

  function checkbox_check(el) {
    if (!$(el).is(':checked')) {
      $(el).next().css('text-decoration', 'none'); // or addClass            
    } else {
      $(el).next().css('text-decoration', 'line-through'); //or addClass
    }
  }
  /*----------------------
  * Plugin initialization
  ------------------------*/
  // Materialize Slider


  $('.slider').slider({
    full_width: true
  }); // Materialize Dropdown

  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 125,
    constrain_width: true,
    // Does not change width of dropdown to that of the activator
    hover: false,
    // Activate on click
    alignment: 'left',
    // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0,
    // Spacing from edge
    belowOrigin: true // Displays dropdown below the button

  }); // Materialize Tabs

  $('.tab-demo').show().tabs();
  $('.tab-demo-active').show().tabs(); // Materialize Parallax

  $('.parallax').parallax();
  $('.modal-trigger').leanModal(); // Materialize scrollSpy

  $('.scrollspy').scrollSpy(); // Materialize tooltip

  $('.tooltipped').tooltip({
    delay: 50
  }); // Materialize sideNav  
  //Main Left Sidebar Menu

  $('.sidebar-collapse').sideNav({
    edge: 'left' // Choose the horizontal origin    

  }); // FULL SCREEN MENU (Layout 02)

  $('.menu-sidebar-collapse').sideNav({
    menuWidth: 240,
    edge: 'left' // Choose the horizontal origin     
    //defaultOpen:true // Set if default menu open is true

  }); // HORIZONTAL MENU (Layout 03)

  $('.dropdown-menu').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false,
    // Does not change width of dropdown to that of the activator
    hover: true,
    // Activate on hover
    gutter: 0,
    // Spacing from edge
    belowOrigin: true // Displays dropdown below the button

  }); //Main Left Sidebar Chat

  $('.chat-collapse').sideNav({
    menuWidth: 300,
    edge: 'right'
  });
  $('.chat-close-collapse').click(function () {
    $('.chat-collapse').sideNav('hide');
  });
  $('.chat-collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style

  }); // Pikadate datepicker

  $('.datepicker').pickadate({
    selectMonths: true,
    // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year

  }); // Perfect Scrollbar

  $('select').not('.disabled').material_select();
  var leftnav = $(".page-topbar").height();
  var leftnavHeight = window.innerHeight - leftnav;
  $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
    suppressScrollX: true
  });
  var righttnav = $("#chat-out").height();
  $('.rightside-navigation').height(righttnav).perfectScrollbar({
    suppressScrollX: true
  }); // Fullscreen

  function toggleFullScreen() {
    if (document.fullScreenElement && document.fullScreenElement !== null || !document.mozFullScreen && !document.webkitIsFullScreen) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  $('.toggle-fullscreen').click(function () {
    toggleFullScreen();
  }); // Floating-Fixed table of contents (Materialize pushpin)

  if ($('nav').length) {
    $('.toc-wrapper').pushpin({
      top: $('nav').height()
    });
  } else if ($('#index-banner').length) {
    $('.toc-wrapper').pushpin({
      top: $('#index-banner').height()
    });
  } else {
    $('.toc-wrapper').pushpin({
      top: 0
    });
  } // Toggle Flow Text


  var toggleFlowTextButton = $('#flow-toggle');
  toggleFlowTextButton.click(function () {
    $('#flow-text-demo').children('p').each(function () {
      $(this).toggleClass('flow-text');
    });
  }); //Toggle Containers on page

  var toggleContainersButton = $('#container-toggle-button');
  toggleContainersButton.click(function () {
    $('body .browser-window .container, .had-container').each(function () {
      $(this).toggleClass('had-container');
      $(this).toggleClass('container');

      if ($(this).hasClass('container')) {
        toggleContainersButton.text("Turn off Containers");
      } else {
        toggleContainersButton.text("Turn on Containers");
      }
    });
  }); // Detect touch screen and enable scrollbar if necessary

  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  if (is_touch_device()) {
    $('#nav-mobile').css({
      overflow: 'auto'
    });
  } //LINE CHART WITH AREA IN SIDEBAR


  new Chartist.Line('#ct2-chart', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [[5, 9, 7, 8, 5, 3, 5, 4]]
  }, {
    low: 0,
    showArea: true
  }); //Trending chart for small screen

  if (window_width <= 480) {
    $("#trending-line-chart").attr({
      height: '200'
    });
  }
}); // end of document ready
},{}]},{},["js/plugins.js"], null)
//# sourceMappingURL=/plugins.7f97feee.map