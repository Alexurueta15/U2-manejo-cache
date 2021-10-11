console.log("SW: hola desde el nuevo sw");
const CACHE_STATIC_NAME = 'cache-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

function cleanCache(cacheName, sizeItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(keys => {
                console.log(keys);
                if (keys.length > sizeItems) {
                    cache.delete(keys[0]).then(() => cleanCache(cacheName, sizeItems));
                }
            });
        });
}


self.addEventListener('install', evt => {
    console.log("nuevo uwu");

    //crear cache y almacenar appshell
    const promiseCache = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'css/page.css',
                'img/perrito.png',
                'js/app.js'
            ]);
        });

    const inmutableCache = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
            ]);
        });

    evt.waitUntil(Promise.all([promiseCache, inmutableCache]));
});

self.addEventListener('fetch', evt => {
    // EStrategias
    //2. primero busca en cache, en caso de non encontrar va a la red.
    const respuestaCache = caches.match(evt.request)
        .then(value => {
            //si la request existe en cache
            if (value) {
                //respondemos con cache
                return value;
            } else {
                //vas a la red
                console.log("no está en caché", evt.request.url)
                return fetch(evt.request).then(resp => {
                    //guardo la respuesta en cache
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                        cache.put(evt.request, resp).then(() => cleanCache(CACHE_DYNAMIC_NAME, 5));
                    });
                    //retorno la respuesta
                    return resp.clone();
                });
            }
        });

    evt.respondWith(respuestaCache);

    // 1. Only cache
    //evt.respondWith(caches.match(evt.request));
});
