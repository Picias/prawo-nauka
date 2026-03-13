const CACHE_NAME = 'nauka-v3';
const ZASOBY_DO_ZAPISANIA = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './ikona.png'
];

// 1. Krok instalacji: pobieranie plików
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ZASOBY_DO_ZAPISANIA))
    );
});

// 2. NOWOŚĆ: Krok aktywacji - USUWANIE STAREJ PAMIĘCI
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((nazwyCache) => {
            return Promise.all(
                nazwyCache.map((nazwa) => {
                    if (nazwa !== CACHE_NAME) {
                        return caches.delete(nazwa); // Usuwa starsze wersje
                    }
                })
            );
        })
    );
});

// 3. Krok obsługi zapytań
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});