/**
 * @description - service worker strategy
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-env worker */
/* global workbox */

// eslint-disable-next-line no-restricted-globals
if (self.location.origin.hostname === 'localhost') {
  workbox.setConfig({
    debug: true,
  });

  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
}

// set cache details
workbox.core.setCacheNameDetails({
  prefix: 'baby',
  suffix: 'v1',
});

// cache CDN resources
workbox.routing.registerRoute(
  /^https:\/\/unpkg\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'CDN',
  })
);

// cache fallback navigator
workbox.routing.registerNavigationRoute('/index.html', {
  whitelist: [/^\/pwa/],
  blacklist: [/\.(js|css|jpe?g|png|gif|pdf)$/],
});

// cache static resources
workbox.precaching.precacheAndRoute(self.__precacheManifest);
