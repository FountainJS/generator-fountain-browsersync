const _ = require('lodash');
var fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: function () {
    this.fountainPrompting();
  },

  configuring: {
    package: function () {
      var pkg = {
        devDependencies: {
          'browser-sync': '^2.9.11'
        }
      };

      if (this.props.dependencyManagement === 'commonjs' && this.props.framework === 'react') {
        _.merge(pkg, {
          devDependencies: {
            'webpack-dev-middleware': '^1.4.0',
            'webpack-hot-middleware': '^2.6.0'
          }
        });
      }

      this.mergeJson('package.json', pkg);
    },

    conf: function () {
      const options = {
        dist: false,
        modules: this.props.modules,
        webpackHotReload: this.props.framework === 'react' && this.props.dependencyManagement === 'commonjs'
      };

      this.fs.copyTpl(
        this.templatePath('conf/browsersync.conf.js'),
        this.destinationPath('conf/browsersync.conf.js'),
        options
      );

      options.dist = true;

      this.fs.copyTpl(
        this.templatePath('conf/browsersync.conf.js'),
        this.destinationPath('conf/browsersync-dist.conf.js'),
        options
      );
    }
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('gulp_tasks/browsersync.js'),
      this.destinationPath('gulp_tasks/browsersync.js')
    );
  }
});
