import { computed, ComputedRef } from '@vue/composition-api'
import store from '@/store'

const getters = {
	isLoggedIn: computed(() => store.getters.isLoggedIn) as ComputedRef<boolean>,
	isTutor: computed(() => store.getters.isTutor) as ComputedRef<boolean>,
	getId: computed(() => store.getters.getId) as ComputedRef<string>,
	questionsLeft: computed(() => store.getters.questionsLeft) as ComputedRef<number>,
}

const actions = {
	setId: (id: string | null) => store.dispatch('setId', id)
}

export const Auth = {
	...getters,
	...actions
}
