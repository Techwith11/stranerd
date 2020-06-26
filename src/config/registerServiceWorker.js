import { Workbox, messageSW } from 'workbox-window'

if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator){
	let wb = new Workbox('./service_worker.js')
	let registration;
	let showSkipWaitingPrompt = async () => {
		wb.addEventListener('controlling', window.location.reload)
		if(registration && registration.waiting){
			await messageSW(registration.waiting, { type: 'SKIP_WAITING' })
		}
	}
	wb.addEventListener('waiting', showSkipWaitingPrompt)
	wb.addEventListener('externalwaiting', showSkipWaitingPrompt)
	wb.register().then(reg => registration = reg)
}
