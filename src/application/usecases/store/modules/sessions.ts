import store from '@/store'

const actions = {
	closeTutorSessionsListener: () => store.dispatch('closeTutorSessionsListener')
}

export const Sessions = {
	...actions
}
