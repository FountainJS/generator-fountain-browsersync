const lit = require('fountain-generator').lit;

module.exports = function browsersyncConf(templateVars) {
  const conf = {
    server: {
      baseDir: []
    },
    open: false
  };

  if (templateVars.dist) {
    conf.server.baseDir.push(lit`conf.paths.dist`);
  } else {
    conf.server.baseDir.push(lit`conf.paths.tmp`);
    if (templateVars.modules === 'systemjs') {
      conf.server.baseDir.push('.');
      if (templateVars.sample === 'jhipster') {
        conf.server.baseDir.push(lit`conf.paths.src`);
      }
    } else {
      conf.server.baseDir.push(lit`conf.paths.src`);
    }
    if (templateVars.modules === 'inject') {
      conf.server.routes = {
        '/bower_components': 'bower_components'
      };
    }
    if (templateVars.modules === 'systemjs') {
      const index = templateVars.sample === 'jhipster' ? 'src/main/webapp/index.html' : 'src/index.html';
      conf.server.routes = {
        '/index.html': index
      };
      conf.server.index = index;
    }
    if (templateVars.webpackHotReload) {
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
