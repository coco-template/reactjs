/**
 * @description - postcss options
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const cssmodule = require('postcss-modules');
const _ = require('lodash');
const postcssBase = require('@coco-platform/webpack-preset/lib/postcss.config');

/**
 * @description - intercept css module mappings
 *
 * @param {string} filename
 * @param {object} mappings
 * @param {string} target
 *
 * @returns {Function}
 */
function getJSON(filename, mappings, target) {
  const output = JSON.stringify(mappings);

  // jest environment
  const destiny = _.isString(output) ? `${target}.json` : `${filename}.json`;

  fs.writeFileSync(destiny, output);
}

module.exports = {
  plugins: [
    ...postcssBase.plugins,
    cssmodule({
      getJSON,
      generateScopedName: '[name]__[local]__[hash:base64:8]',
    }),
  ],
};
