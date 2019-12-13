var cacheName = 'lugarlivre v1.1';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/service-worker.js',

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
