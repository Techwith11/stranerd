import { Workbox } from 'workbox-window'

let workbox = null as Workbox | null

if ('serviceWorker' in navigator){
	workbox = new Workbox(`${process.env.BASE_URL}service-worker.js`)
	workbox?.addEventListener('controlling', window.location.reload)
	workbox.register()
}

const addWaitingListener = (callback: () => void) => {
	workbox?.addEventListener('waiting', callback)
	//@ts-ignore
	workbox?.addEventListener('externalwaiting', callback)
}

const acceptUpdate = (callback: () => boolean) => {
	if(callback?.()) workbox?.messageSW({ type: 'SKIP_WAITING' })
}

export { acceptUpdate, addWaitingListener }
