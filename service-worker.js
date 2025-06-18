self.addEventListener('install', event => {
  console.log('[SW] Instalada');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activada');
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});