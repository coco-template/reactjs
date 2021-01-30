/**
 * @description - postcss options
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const atImport = require('postcss-import');
// const PXToViewport = require('postcss-px-to-viewport');

module.exports = {
  plugins: [
    atImport(),
    nested(),
    autoprefixer(),
    /* use self own dimension */
    // PXToViewport({
    //   viewportWidth: 375,
    //   viewportHeight: 667,
    //   unitPrecision: 5,
    //   selectorBlackList: [],
    // }),
  ],
};
