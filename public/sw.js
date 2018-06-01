/**
 * @description - service worker strategy
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-env worker */
/* global workbox */

// import workbox library
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js'
);

workbox.setConfig({
  debug: true,
});
workbox.core.setCacheNameDetails({
  prefix: 'babycherry',
  suffix: 'v1',
});
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// route strategy
workbox.routing.registerRoute(
  /^https:\/\/cdn\.bootcss\.com./,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'CDN',
  })
);
workbox.routing.registerNavigationRoute('/index.html', {
  whitelist: [/^\/pwa/],
  blacklist: [/\.(js|css|jpe?g|png|gif|pdf)$/],
});
workbox.precaching.precacheAndRoute([]);
