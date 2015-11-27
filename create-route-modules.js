'use strict';

const path = require('path');

module.exports = function() {
  this.cacheable && this.cacheable();

  const routes = require(path.join(process.cwd(), 'config', 'route.js'));

  const modules = routes.map(function(route) {
    return `  '${route.name}': require('bundle?lazy&name=${route.name}!${route.module}')`;
  });

  const result = `'use strict';
module.exports =  {
${modules.join(',\n')}
};`;

  return result;
};

/*

 Output format:

  'use strict';
  module.exports = {
    'root': require('bundle?lazy&name=root!/absolute/path/to/root/module'),
    'about': require('bundle?lazy&name=about!/absolute/path/to/about/module'),
    'about.me': require('bundle?lazy&name=about.me!/absolute/path/to/about.me/module'),
  };

 */
