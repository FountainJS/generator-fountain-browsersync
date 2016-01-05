const lit = require('fountain-generator').lit;

module.exports = function browsersyncConf(props) {
  const conf = {
    server: {
      baseDir: []
    }
  };

  if (props.dist) {
    conf.server.baseDir.push(lit`conf.paths.dist`);
  } else {
    conf.server.baseDir.push(lit`conf.paths.tmp`);
    if (props.modules === 'systemjs') {
      conf.server.baseDir.push('.');
    } else {
      conf.server.baseDir.push(lit`conf.paths.src`);
    }
    if (props.modules === 'inject') {
      conf.server.routes = {
        '/bower_components': 'bower_components'
      };
    }
    if (props.modules === 'systemjs') {
      conf.server.routes = {
        '/index.html': 'src/index.html'
      };
      conf.server.index = 'src/index.html';
    }
  }

  return conf;
};
