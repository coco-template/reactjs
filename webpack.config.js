/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const presets = require('@coco-platform/webpack-preset');
const _ = require('lodash');
const request = require('superagent');

// scope
const address =
  // eslint-disable-next-line max-len
  'https://gist.githubusercontent.com/huang-xiao-jian/a66ff80a5c811066dccb11811b734a49/raw/7e72c26a60158c5d13bf5f59c86881b3d07ddc08/bootcdn.externals.stable.yml';
const options = {
  development: {
    entry: 'src/main.jsx',
  },
};
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

module.exports = new Promise((resolve, reject) => {
  request
    .get(address)
    .timeout(12000)
    .then((res) => res.text)
    .then((definition) => {
      const developmentOptions = _.assign({}, options.development, {
        definition,
      });
      const developmentConfiguration = presets.development(developmentOptions);
      const configuration = _.assign({}, developmentConfiguration, {
        externals,
      });

      resolve(configuration);
    })
    .catch((err) => reject(err));
});
