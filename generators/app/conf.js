const lit = require('fountain-generator').lit;

module.exports = function browsersyncConf(props) {
  const conf = {
    server: {
      baseDir: [],
      browser: []
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
    if (props.webpackHotReload) {
      conf.server.middleware = [
        lit`webpackDevMiddleware(webpackBundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConf.output.publicPath,

        // Quiet verbose output in console
        quiet: true
      }),

      // bundler should be the same as above
      webpackHotMiddleware(webpackBundler)`
      ];
    }
  }

  return conf;
};
