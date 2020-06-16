import { Workbox, messageSW } from 'workbox-window'

if(process.env.Node_ENV === 'production' && 'serviceWorker' in navigator){
	let wb = new Workbox('./service_worker.js')
	let registration;
	let showSkipWaitingPrompt = async () => {
		let result = await new window.SweetAlert({
			title: 'New content',
			text: 'This page has new content. Would you like to download it?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		})
		if (result.value) {
			wb.addEventListener('controlling', window.location.reload)
			if(registration && registration.waiting){
				await messageSW(registration.waiting, { type: 'SKIP_WAITING' })
			}
		}
	}
	wb.addEventListener('waiting', showSkipWaitingPrompt)
	wb.addEventListener('externalwaiting', showSkipWaitingPrompt)
	wb.register().then(reg => registration = reg)
}
