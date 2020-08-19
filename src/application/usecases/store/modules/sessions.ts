import { Store } from '@/store'

const actions = {
	closeTutorSessionsListener: () => Store.dispatch('closeTutorSessionsListener')
}

export const Sessions = {
	...actions
}
