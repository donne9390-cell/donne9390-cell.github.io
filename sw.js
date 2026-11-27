/* My AJCAL : ouverture rapide et lecture hors connexion */
var V="ajcal-v1",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url),same=u.origin===location.origin,sdk=u.hostname==="www.gstatic.com"&&u.pathname.indexOf("/firebasejs/")===0;
 if(!same&&!sdk)return;
 var page=r.mode==="navigate"||(same&&(/\/$/.test(u.pathname)||/index\.html$/.test(u.pathname))),key=page?"index.html":r;
 e.respondWith(caches.match(key).then(function(m){var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque")){var c=res.clone();caches.open(V).then(function(ca){ca.put(key,c)})}return res}).catch(function(){return m});return m||net}))});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){return l.length?l[0].focus():self.clients.openWindow("./")}))});
