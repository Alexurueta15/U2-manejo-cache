if (navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js');
}

if (window.caches){
    console.log("Tenemos caché");

   /*
   *  caches.open('prueba');
    caches.open('prueba-v2');

    caches.has('prueba').then(console.log);


    caches.open('prueba-v1').then((cache)=>cache.addAll([
        '/index.html',
        '/css/page.css',
        '/img/perrito.png',
    ]));*/

    //cache.delete('/index.html') para eliminar un elemento
    //cache.put('element', newBody) para cambiar el contenido de ese recuerso en cache
    //cache.match('element').then... para encontrar un elemento y llevarla a una promesa
}
