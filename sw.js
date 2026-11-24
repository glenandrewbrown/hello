// Keeps the QR screen for when there is no signal: the network first, the kept copy if it fails.
const KEPT = 'hello-1'
const QR = new URL('qr.html', self.location).href
self.addEventListener('install', (e) => e.waitUntil(caches.open(KEPT).then((c) => c.add(QR)).then(() => self.skipWaiting())))
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  if (e.request.url.split(/[?#]/)[0] !== QR) return
  e.respondWith(fetch(e.request, { signal: AbortSignal.timeout(2500) }).catch(() => caches.match(QR)))
})
