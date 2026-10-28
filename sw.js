const C='dav-students-v1';
const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const STATIC=/cdn\.jsdelivr\.net|storage\.googleapis\.com\/mediapipe-models|www\.gstatic\.com\/firebasejs|cdnjs\.cloudflare\.com/;
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(A.map(u=>c.add(u)))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const same=new URL(r.url).origin===location.origin;
  if(!same&&!STATIC.test(r.url))return; // Firestore, sign-in and other API calls go straight to the network
  e.respondWith((async()=>{
    const c=await caches.open(C);
    if(same){
      try{const n=await fetch(r);if(n.ok)c.put(r,n.clone()).catch(()=>{});return n}
      catch(_){return (await c.match(r))||(await c.match('./index.html'))}
    }
    const hit=await c.match(r);if(hit)return hit;
    const n=await fetch(r);if(n.status===200)c.put(r,n.clone()).catch(()=>{});return n;
  })())});
