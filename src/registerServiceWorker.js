/* eslint-disable no-console */

const CACHE_NAME = 'xkcd-reader-v1';
const MAX_ITEMS = 100;

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')

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

    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
