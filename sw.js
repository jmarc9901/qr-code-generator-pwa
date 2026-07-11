// Service Worker for QR Generator PWA
const VERSION = '1.0.1';
const CACHE_NAME = `qr-generator-v${VERSION}`;
const STATIC_CACHE = `qr-generator-static-v${VERSION}`;
const DYNAMIC_CACHE = `qr-generator-dynamic-v${VERSION}`;

// Files to cache
const STATIC_FILES = [
	'/',
	'/index.html',
	'/test-local-qr.html',
	'/css/style.css',
	'/js/app.js',
	'/js/qr-types.js',
	'/js/pwa.js',
	'/js/qr-worker.js',
	'/js/libs/qrcode.min.js',
	'/js/libs/qrcode-wrapper.js',
	'/js/libs/qrcode-worker-wrapper.js',
	'/manifest.json',
	'/css/style.min.css',
	'/assets/icons/icon-192x192.png',
	'/assets/icons/icon-512x512.png',
	'/js/utils.js',
	'/js/validation.js',
	'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event
self.addEventListener('install', (event) => {
	console.log('Service Worker installing...');
	
	event.waitUntil(
		caches.open(STATIC_CACHE)
			.then((cache) => {
				console.log('Caching static files');
				return cache.addAll(STATIC_FILES);
			})
			.then(() => {
				console.log('Service Worker installed');
				return self.skipWaiting();
			})
			.catch((error) => {
				console.error('Error during install:', error);
			})
	);
});

// Activate event
self.addEventListener('activate', (event) => {
	console.log('Service Worker activating...');
	
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
							console.log('Deleting old cache:', cacheName);
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => {
				console.log('Service Worker activated');
				return self.clients.claim();
			})
	);
});

// Fetch event
self.addEventListener('fetch', (event) => {
	// Skip requests for extensions, dev tools, etc.
	if (event.request.url.startsWith('chrome-extension://') || 
		event.request.url.includes('extension') ||
		event.request.url.includes('devtools')) {
		return;
	}
	
	// For same-origin requests, try cache first, then network
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request)
				.then((cachedResponse) => {
					// Return cached response if found
					if (cachedResponse) {
						return cachedResponse;
					}
					
					// Otherwise fetch from network
					return fetch(event.request)
						.then((networkResponse) => {
							// Cache the response for future use (only for GET requests)
							if (event.request.method === 'GET' && networkResponse.ok) {
								const responseToCache = networkResponse.clone();
								caches.open(DYNAMIC_CACHE)
									.then((cache) => {
										cache.put(event.request, responseToCache);
									});
							}
							return networkResponse;
						})
						.catch((error) => {
							console.error('Network request failed:', error);
							// Return a fallback page for HTML requests
							if (event.request.headers.get('accept').includes('text/html')) {
								return caches.match('/index.html');
							}
							return new Response('Network error occurred', {
								status: 408,
								headers: { 'Content-Type': 'text/plain' }
							});
						});
				})
		);
	}
});

// Handle push notifications
self.addEventListener('push', (event) => {
	console.log('Push notification received');
	
	const options = {
		body: event.data ? event.data.text() : 'New notification from QR Generator',
		icon: '/assets/icons/icon-192x192.png',
		badge: '/assets/icons/icon-32x32.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		},
		actions: [
			{
				action: 'explore',
				title: 'Open app',
				icon: '/assets/icons/icon-32x32.png'
			},
			{
				action: 'close',
				title: 'Close',
				icon: '/assets/icons/icon-32x32.png'
			}
		]
	};
	
	event.waitUntil(
		self.registration.showNotification('QR Generator', options)
	);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
	console.log('Notification clicked:', event.action);
	
	event.notification.close();
	
	if (event.action === 'explore') {
		event.waitUntil(
			clients.openWindow('/')
		);
	}
});

// Handle message
self.addEventListener('message', (event) => {
	console.log('Message received in SW:', event.data);
	
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});