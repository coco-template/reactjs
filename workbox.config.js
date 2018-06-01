/**
 * @description - workbox configuration for PWA
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

module.exports = {
  swSrc: 'public/sw.js',
  swDest: 'dist/client/sw.js',
  globDirectory: 'dist/client',
  globPatterns: ['**/*.{png,ico,html,json,jpg,js,css}'],
};
