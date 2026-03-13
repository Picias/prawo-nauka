const CACHE_NAME = 'nauka-v2';
const ZASOBY_DO_ZAPISANIA = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './ikona.png'
];

// 1. Krok instalacji: pobieranie plików do pamięci telefonu
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Zapisywanie plików w pamięci podręcznej (cache)');
                return cache.addAll(ZASOBY_DO_ZAPISANIA);
            })
    );
});

// 2. Krok obsługi zapytań: serwowanie plików z pamięci (działanie offline)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Jeśli plik jest w pamięci, zwróć go. Jeśli nie, spróbuj pobrać z sieci.
                return response || fetch(event.request);
            })
    );
});