import { functions } from '@/config/firebase'
import { notify } from '@/config/notifications'

export const makeTutor = (tutor: object) => {
	let makeTutor = functions.httpsCallable('makeTutor')
	return makeTutor(tutor)
		.then((res) => res.data)
		.catch((error) => notify({ icon: 'error', title: error.message }))
}
export const makeAdmin = (id: string) => {
	let makeAdmin = functions.httpsCallable('makeAdmin')
	return makeAdmin(id)
		.then((res) => res.data)
		.catch((error) => notify({ icon: 'error', title: error.message }))
}
export const removeAdmin = (id: string) => {
	let removeAdmin = functions.httpsCallable('removeAdmin')
	return removeAdmin(id)
		.then((res) => res.data)
		.catch((error) => notify({ icon: 'error', title: error.message }))
}
