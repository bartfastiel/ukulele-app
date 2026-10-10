// Nach dem Umzug auf eine neue Adresse: alten Service Worker samt Offline-Daten entfernen und offene Fenster neu laden,
// damit sie die Weiterleitung (src/site/move.ts) bekommen.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((list) => list.forEach((c) => c.navigate(c.url))),
  );
});
