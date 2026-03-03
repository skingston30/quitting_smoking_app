const cacheName = 'freedom-v1';
const assets = ['./', './index.html', './style.css', './script.js', './manifest.json'];

// Install the service worker and cache files
self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

// Fetch files from cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});