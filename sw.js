const cacheName = 'freedom-v2'; // Changed to v2 to force an update
const assets = ['./', './index.html', './style.css', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

// Add this to clear out old versions of the app
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});