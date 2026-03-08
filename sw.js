/**
 * Service Worker for Smart Quiz PWA
 * Cache-first strategy for static assets, network-first for HTML
 */

const CACHE_NAME = 'smart-quiz-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/core/utils.js',
  '/js/core/state.js',
  '/js/core/storage.js',
  '/js/core/navigation.js',
  '/js/ui/darkmode.js',
  '/js/ui/feedback.js',
  '/js/ui/audio.js',
  '/js/ui/virtual-keyboard.js',
  '/manifest.json'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - cache-first for assets, network-first for HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Cache hit - return cached version
      if (cachedResponse) {
        return cachedResponse;
      }

      // Cache miss - fetch from network and cache
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone response (can only be consumed once)
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Network failed - return offline page if available
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
