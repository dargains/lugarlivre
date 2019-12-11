var cacheName = 'lugarlivre v1.0';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/service-worker.js',

  '/icons/android-icon-36x36.png',
  '/icons/android-icon-48x48.png',
  '/icons/android-icon-72x72.png',
  '/icons/android-icon-96x96.png',
  '/icons/android-icon-144x144.png',
  '/icons/android-icon-192x192.png',
  '/icons/android-icon-512x512.png',

  '/icons/appple-icon-57x57.png',
  '/icons/appple-icon-60x60.png',
  '/icons/appple-icon-72x72.png',
  '/icons/appple-icon-76x76.png',
  '/icons/appple-icon-114x114.png',
  '/icons/appple-icon-120x120.png',
  '/icons/appple-icon-144x144.png',
  '/icons/appple-icon-152x152.png',
  '/icons/appple-icon-180x180.png',
  '/icons/appple-icon-precomposed.png',
  '/icons/appple-icon.png',

  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-96x96.png',

  '/icons/ms-icon-70x70.png',
  '/icons/ms-icon-144x144.png',
  '/icons/ms-icon-150x150.png',
  '/icons/ms-icon-310x310.png',

  '/icons/mstile-150x150.png',
  '/icons/safari-pinned-tab.png',

  '/static/css/main.css',
  '/static/css/main.css.map',
  '/static/css/chunk.css',
  '/static/css/chunk.css.map',

  '/static/js/main.js',
  '/static/js/main.js.map',
  '/static/js/chunk.js',
  '/static/js/chunk.js.map',
  '/static/js/runtime-main.js',
  '/static/js/runtime-main.js.map',

  '/static/media/Cloud 01.svg',
  '/static/media/Cloud 02.svg',
  '/static/media/Cloud 03.svg',
  '/static/media/Logo.svg'

];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
