/* Cache simples para consulta offline (só funciona em HTTPS ou localhost). Incrementar VERSION ao publicar alterações. */
const VERSION = 'v1';
const CORE = ['./', 'index.html', 'qr.html', 'manifest.webmanifest',
  'assets/css/deck.css', 'assets/js/deck.js', 'assets/js/charts.js', 'assets/js/qrcode.js', 'assets/img/favicon.svg',
  'assets/fonts/Carlito-Regular.woff2', 'assets/fonts/Carlito-Bold.woff2', 'assets/fonts/Carlito-Italic.woff2', 'assets/fonts/Carlito-BoldItalic.woff2',
  'assets/fonts/Caladea-Regular.woff2', 'assets/fonts/Caladea-Bold.woff2', 'assets/fonts/Caladea-Italic.woff2', 'assets/fonts/Caladea-BoldItalic.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(r, copy)); } return res; }).catch(() => hit);
    return hit || net;     // imagens e restantes ficheiros ficam em cache após a primeira visita
  }));
});
