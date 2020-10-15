import { computed, ComputedRef } from '@vue/composition-api'
import { Store } from '@application/store'
import { UserFromModel } from '@modules/users/data/models/user'

const getters = {
	isLoggedIn: computed(() => Store.getters.isLoggedIn) as ComputedRef<boolean>,
	isAdmin: computed(() => Store.getters.isAdmin) as ComputedRef<boolean>,
	isTutor: computed(() => Store.getters.isTutor) as ComputedRef<boolean>,
	isSubscribed: computed(() => Store.getters.isSubscribed) as ComputedRef<boolean>,
	getId: computed(() => Store.getters.getId) as ComputedRef<string>,
	getUser: computed(() => Store.getters.getUser) as ComputedRef<UserFromModel>,
	questionsLeft: computed(() => Store.getters.questionsLeft) as ComputedRef<number>,
	getDefaultImage: computed(() => Store.getters.getDefaultImage) as ComputedRef<string>,
}

const actions = {
	setId: (id: string | null) => Store.dispatch('setId', id)
}

export const Auth = {
	...getters,
	...actions
}
