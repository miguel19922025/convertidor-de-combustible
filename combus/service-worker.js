// service-worker.js
const CACHE_NAME = 'fuel-converter-v1';
const urlsToCache = [
  '/combus/', // La raíz de tu aplicación ahora será /combus/
  '/combus/index.html',
  '/combus/manifest.json',
  '/combus/service-worker.js',
  'https://cdn.tailwindcss.com', // Cacha también Tailwind CSS
  // Agrega aquí todas las rutas a tus iconos
  '/combus/icons/icon-192x192.png',
  '/combus/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
                // Elimina cachés antiguas que no están en la lista blanca
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
