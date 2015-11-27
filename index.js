'use strict';

var routeModules = require('./create-route-modules.js!../../../config/route.js');

function load(routeName, cb) {
  var loadModule = routeModules[routeName];
  loadModule(cb);
}

module.exports = {
  load: load
};
