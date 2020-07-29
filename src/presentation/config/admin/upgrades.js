import { functions } from '@/config/firebase'

export const makeTutor = (tutor) => {
	let makeTutor = functions.httpsCallable('makeTutor')
	return makeTutor(tutor)
		.then((res) => res.data)
		.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
}
export const makeAdmin = (id) => {
	let makeAdmin = functions.httpsCallable('makeAdmin')
	return makeAdmin(id)
		.then((res) => res.data)
		.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
}
export const removeAdmin = (id) => {
	let removeAdmin = functions.httpsCallable('removeAdmin')
	return removeAdmin(id)
		.then((res) => res.data)
		.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
}
