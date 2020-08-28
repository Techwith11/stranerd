import { functions } from '@/config/firebase'
import { Notify } from '@/config/notifications'

export const makeTutor = (tutor: object) => {
	const makeTutor = functions.httpsCallable('makeTutor')
	return makeTutor(tutor)
		.then((res) => res.data)
		.catch((error) => Notify({ icon: 'error', title: error.message }))
}
