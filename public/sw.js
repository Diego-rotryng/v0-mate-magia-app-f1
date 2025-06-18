self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("mate-magia").then((cache) => {
      return cache.addAll(["/", "/index.html"])
    }),
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((resp) => resp || fetch(e.request)))
})
