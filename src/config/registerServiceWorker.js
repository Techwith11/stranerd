import { Workbox, messageSW } from 'workbox-window'

if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator){
	let wb = new Workbox('./service_worker.js')
	let registration;
	let showSkipWaitingPrompt = async () => {
		let result = await new window.Toast({
			title: 'New content available',
			position: 'bottom-end',
			confirmButtonText:'Refresh',
			showConfirmButton:true,
			timer:8000,
			toast:true
		})
		if (result.value) {
			wb.addEventListener('controlling', window.location.reload)
			if(registration && registration.waiting){
				await messageSW(registration.waiting, { type: 'SKIP_WAITING' })
			}
		}
	}
	console.log(123)
	wb.addEventListener('waiting', showSkipWaitingPrompt)
	wb.addEventListener('externalwaiting', showSkipWaitingPrompt)
	wb.register().then(reg => registration = reg)
}
