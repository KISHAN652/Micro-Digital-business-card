const CACHE_NAME = 'micro-card-v2'; // Changed name to force update
const urlsToCache = [
    './',
    './index.html',
    './styles.css?v=2.0',
    './app.js?v=2',
    './manifest.json',
    './logo.jpg',
    './qrcode.min.js?v=1',
    './icons/icon-72.svg',
    './icons/icon-96.svg',
    './icons/icon-128.svg',
    './icons/icon-144.svg',
    './icons/icon-152.svg',
    './icons/icon-192.svg',
    './icons/icon-384.svg',
    './icons/icon-512.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }) // ignoreSearch: true is critical for ?v=1 matching
            .then((response) => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // Fallback to index if network fails
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
