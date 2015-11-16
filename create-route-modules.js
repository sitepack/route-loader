'use strict';

const path = require('path');
const fs = require('fs');

const routes = require(path.join(process.cwd(), 'config', 'route.js'));

module.exports = function(source) {
  const modules = routes.map(function(route) {
    return `  ${route.name}: require('bundle?lazy&name=${route.name}!${route.module}')`;
  });

  const result = `'use strict';
module.exports =  {
${modules.join(',\n')}
};`;

  console.log(result);
  console.log('\n\n');

  return result;
};
