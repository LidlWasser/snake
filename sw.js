/* Service Worker: macht Snake offline spielbar.
   Nach Ã„nderungen am Spiel VERSION hochzÃ¤hlen, damit Handys die neue Version laden. */
var VERSION = 'snake-v9';
var CORE = [
  './',
  './index.html',
  './manifest.json',
  './music.ogg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  // Die Seite selbst: erst Netz (fÃ¼r Updates), offline aus dem Cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () { return caches.match('./index.html'); })
    );
    return;
  }

  // Musik: Audio fragt TeilstÃ¼cke (Range) an, die beantworten wir aus der gecachten Datei
  var range = req.headers.get('range');
  if (range && /\.ogg$/.test(new URL(req.url).pathname)) {
    e.respondWith(
      caches.match('./music.ogg').then(function (hit) {
        return hit || fetch('./music.ogg');
      }).then(function (res) { return res.blob(); }).then(function (blob) {
        var m = /bytes=(\d*)-(\d*)/.exec(range) || [];
        var start = m[1] ? parseInt(m[1], 10) : 0;
        var end = m[2] ? parseInt(m[2], 10) : blob.size - 1;
        end = Math.min(end, blob.size - 1);
        return new Response(blob.slice(start, end + 1), {
          status: 206,
          headers: {
            'Content-Type': 'audio/ogg',
            'Content-Range': 'bytes ' + start + '-' + end + '/' + blob.size,
            'Content-Length': String(end - start + 1),
            'Accept-Ranges': 'bytes'
          }
        });
      })
    );
    return;
  }

  // Alles andere (Icons, Schriften): Cache zuerst, sonst Netz und merken
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
