function removeCss(routeName){
  var fileName = '/assets/' + routeName + '.css';
  var links = document.getElementsByTagName('link');
  for (var i = links.length ; i >= 0 ; i--) {
    var link = links[i];
    if (link && link.getAttribute('href')
      && link.getAttribute('href').indexOf(filename) != -1) {

      link.parentNode.removeChild(link);
    }
  }
}

function RouteLaoder(routeModules) {
  this.routeModules = routeModules;
  var that = this;

  this.load = function(routeName, cb) {
    function done(module) {
      // route module will create a style tag and insert it's css into it.
      // remove pre-rendered css to avoid duplicated css.
      if (!that.cssRemoved) {
        removeCss(routeName);
        that.cssRemoved = true;
      }

      cb(module);
    }

    var module = that.routeModules[routeName];
    if (typeof module === 'function') {
      // lazy load module
      module(done);
    } else {
      done(module);
    }
  };
}

module.exports = RouteLaoder;
