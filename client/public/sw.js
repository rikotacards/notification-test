self.addEventListener('push', event => {
    console.log('[Service Worker] Push received:', event);

  // const data = event.data.json();
  self.registration.showNotification("hi", {
    body: "new like",
    icon: '/pwa-192x192.png',
  });
});
