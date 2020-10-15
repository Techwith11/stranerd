import { Store } from '@application/store'

const actions = {
	closeTutorSessionsListener: () => Store.dispatch('closeTutorSessionsListener')
}

export const Sessions = {
	...actions
}
