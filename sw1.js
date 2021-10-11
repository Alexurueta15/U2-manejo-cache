self.addEventListener('install', () => console.log("SW: instalado"))

console.log("hello from SW uwu")

self.addEventListener('fetch', evt => {
    /*
    * const respOff = new Response(`
    Bienvenido a la página offline

    para poder usar la app necesitas conexión a internet
    `);

    const respOffHtml = new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>my PWA | CACHES</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
            <link rel="stylesheet" href="css/page.css">
        </head>
        <body>
            <h1>Bienvenido a la página offline</h1>
            <h2>para poder usar la app necesitas conexión a internet</h2>
        </body>
        </html>
    `, {headers: {'content-type': 'text/html'}})
    */

    const respOffFile = fetch('/pages/view-offline.html')

    const resp = fetch(evt.request).catch(() => {
        console.log("sw: Error en la petición")
        return respOffFile;
    });

    evt.respondWith(resp);

    console.log(evt.request.url);
})
