// Network-independent static asset cache. Bump the key on each app/content release.
const CACHE='dhikr-daily-v2.1.0';
const ASSETS=['./','./index.html','./styles.css','./data.js','./mathurat.js','./hisn-full.json','./app.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin){let copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}))) });
