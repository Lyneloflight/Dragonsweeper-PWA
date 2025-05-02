const CACHE_NAME = 'my-cache-v1';
const CACHE_FILES = [
  'index.html',
  'manifest.json',
  'service-worker.js',
  'icons/icon-15x15.jpeg',
  'icons/icon-16x16.jpeg',
  'icons/icon-32x32.jpeg',
  'icons/icon-132x132.jpeg',
  'icons/icon-158x158.jpeg',
  'game.js',
  'gamelib.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
