import { functions } from '@/config/firebase'
import { Notify } from '@/config/notifications'

export const makeTutor = (tutor: object) => {
	const makeTutor = functions.httpsCallable('makeTutor')
	return makeTutor(tutor)
		.then((res) => res.data)
		.catch((error) => Notify({ icon: 'error', title: error.message }))
}
export const makeAdmin = (id: string) => {
	const makeAdmin = functions.httpsCallable('makeAdmin')
	return makeAdmin(id)
		.then((res) => res.data)
		.catch((error) => Notify({ icon: 'error', title: error.message }))
}
export const removeAdmin = (id: string) => {
	const removeAdmin = functions.httpsCallable('removeAdmin')
	return removeAdmin(id)
		.then((res) => res.data)
		.catch((error) => Notify({ icon: 'error', title: error.message }))
}
