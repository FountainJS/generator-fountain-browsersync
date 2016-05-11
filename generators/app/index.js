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
    this.copyTemplate(
      'gulp_tasks/browsersync.js',
      'gulp_tasks/browsersync.js',
      conf(this.props)
    );
  }
});
