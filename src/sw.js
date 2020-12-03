const CACHE_NAME = 'xkcd-reader-v1';
const MAX_ITEMS = 100;

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => (
        cache.match(event.request).then(response => (
            response
            || fetch(event.request).then(response => (
                cache.keys().then(keys => {
                  if (keys.length < MAX_ITEMS) {
                    cache.put(event.request, response.clone());
                    return response;
                  } else {
                    return cache.delete(keys[0]).then(() => {
                      cache.put(event.request, response.clone());
                      return response;
                    })
                  }
                })
               ))
        ))
    ))
  );
});
