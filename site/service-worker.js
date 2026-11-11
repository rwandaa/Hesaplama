const VERSION='konik-v4.6-20261111';
const ASSETS=['/','/index.html','/manifest.webmanifest','/icon-192.png','/icon-512.png','/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('konik-')&&k!==VERSION).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;if(new URL(event.request.url).pathname.startsWith('/.netlify/'))return;if(event.request.mode==='navigate')event.respondWith(fetch(event.request).then(r=>{const clone=r.clone();caches.open(VERSION).then(c=>c.put('/index.html',clone));return r}).catch(()=>caches.match('/index.html')));else event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))});
