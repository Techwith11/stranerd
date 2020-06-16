let { core, expiration, precaching, routing, strategies } = self.workbox

self.addEventListener('message', event => {
	if(event.data && event.data.type === 'SKIP_WAITING'){
		event.currentTarget.skipWaiting()
	}
})
self.addEventListener('install', async event => {
	let cacheName = core.cacheNames.runtime
	let cache = await caches.open(cacheName)
	event.waitUntil(cache.addAll(['/']))
})

precaching.precacheAndRoute(self.__precacheManifest || [])
routing.registerRoute(({ request }) => request.destination === 'style', new strategies.StaleWhileRevalidate({ cacheName: 'css-cache' }))
routing.registerRoute(({ request }) => request.destination === 'script', new strategies.StaleWhileRevalidate({ cacheName: 'js-cache' }))
routing.registerRoute(({ request }) => request.destination === 'image', new strategies.CacheFirst({ cacheName: 'image-cache', plugins: [
		new expiration.Plugin({
			maxEntries: 50,
			maxAgeSeconds: 7 * 24 * 60 * 60
		})
	]
}))