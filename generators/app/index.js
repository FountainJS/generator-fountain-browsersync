const _ = require('lodash');
const fountain = require('fountain-generator');
const conf = require('./conf');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  configuring: {
    package() {
      const pkg = {
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

    conf() {
      const props = Object.assign({
        dist: false,
        webpackHotReload: this.props.framework === 'react' && this.props.modules === 'webpack'
      }, this.props);

      props.browsersyncConf = conf(props);

      this.copyTemplate('conf/browsersync.conf.js', 'conf/browsersync.conf.js', props);

      props.dist = true;
      props.browsersyncConf = conf(props);

      this.copyTemplate('conf/browsersync.conf.js', 'conf/browsersync-dist.conf.js', props);
    }
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('gulp_tasks/browsersync.js'),
      this.destinationPath('gulp_tasks/browsersync.js')
    );
  }
});
