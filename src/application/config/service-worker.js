const { cacheableResponse, expiration, precaching, routing, strategies } = self.workbox

self.addEventListener('message', (event) => event.data?.type === 'SKIP_WAITING' && self.skipWaiting())

precaching.precacheAndRoute(self.__precacheManifest || [], {})
routing.registerRoute(({ request }) => request.destination === 'image', new strategies.CacheFirst({ cacheName: 'images', plugins: [
		new cacheableResponse.Plugin({ statuses: [0, 200] }),
		new expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 })
	]}))
routing.registerRoute(({ url }) => url.origin === 'https://fonts.googleapis.com', new strategies.StaleWhileRevalidate({ cacheName: 'fonts-stylesheets' }))
routing.registerRoute(({ url }) => url.origin === 'https://fonts.gstatic.com', new strategies.CacheFirst({ cacheName: 'fonts', plugins: [
		new cacheableResponse.Plugin({ statuses: [0, 200] }),
		new expiration.Plugin({ maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 })
	]}))
routing.registerNavigationRoute('/')
