const CACHE_NAME = 'pipling-v2';
const urlsToCache = [
  '/forest-companion/',
  '/forest-companion/index.html',
  '/forest-companion/manifest.json',
  '/forest-companion/assets/meyer_lemon.png',
  '/forest-companion/assets/meyer_lemon_seed.png',
  '/forest-companion/assets/meyer_lemon_sprout.png',
  '/forest-companion/assets/meyer_lemon_sapling.png',
  '/forest-companion/assets/meyer_lemon_mature.png',
  '/forest-companion/assets/black_mission_fig.png',
  '/forest-companion/assets/black_mission_fig_seed.png',
  '/forest-companion/assets/black_mission_fig_sprout.png',
  '/forest-companion/assets/black_mission_fig_sapling.png',
  '/forest-companion/assets/black_mission_fig_mature.png',
  '/forest-companion/assets/white_peach.png',
  '/forest-companion/assets/white_peach_seed.png',
  '/forest-companion/assets/white_peach_sprout.png',
  '/forest-companion/assets/white_peach_sapling.png',
  '/forest-companion/assets/white_peach_mature.png',
  '/forest-companion/assets/alpine_strawberry.png',
  '/forest-companion/assets/alpine_strawberry_seed.png',
  '/forest-companion/assets/alpine_strawberry_sprout.png',
  '/forest-companion/assets/alpine_strawberry_sapling.png',
  '/forest-companion/assets/alpine_strawberry_mature.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});
