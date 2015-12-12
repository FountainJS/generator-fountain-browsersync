const conf = require('./gulp.conf');
<% if (!dist && webpackHotReload) { -%>

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);
<% } -%>

module.exports = function() {
  return {
    server: {
<% if (dist) { -%>
      baseDir: [ conf.paths.dist ]
<% } else { -%>
      baseDir: [ conf.paths.tmp, conf.paths.src ],
      routes: {
<%   if (modules === 'inject') { -%>
        '/bower_components': 'bower_components'
<%   } else if (modules === 'commonjs') { -%>
        '/node_modules': 'node_modules'
<%   } else if (modules === 'systemjs') { -%>
        '/jspm_packages': 'jspm_packages',
        '/config.js': 'config.js'
<%   } -%>
<%   if (!webpackHotReload) { -%>
      }
<%   } else { -%>
      },
      middleware: [
        webpackDevMiddleware(webpackBundler, { stats: { colors: true } }),
        webpackHotMiddleware(webpackBundler)
      ]
<%   } -%>
<% } -%>
    }
  };
};
