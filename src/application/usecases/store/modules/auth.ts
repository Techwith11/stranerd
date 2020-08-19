import { computed, ComputedRef } from '@vue/composition-api'
import store from '@/store'
import { UserEntity } from '@root/modules/users/domain/entities/user'

const getters = {
	isLoggedIn: computed(() => store.getters.isLoggedIn) as ComputedRef<boolean>,
	isAdmin: computed(() => store.getters.isAdmin) as ComputedRef<boolean>,
	isTutor: computed(() => store.getters.isTutor) as ComputedRef<boolean>,
	isSubscribed: computed(() => store.getters.isSubscribed) as ComputedRef<boolean>,
	getId: computed(() => store.getters.getId) as ComputedRef<string>,
	getUser: computed(() => store.getters.getUser) as ComputedRef<UserEntity>,
	questionsLeft: computed(() => store.getters.questionsLeft) as ComputedRef<number>,
}

const actions = {
	setId: (id: string | null) => store.dispatch('setId', id)
}

export const Auth = {
	...getters,
	...actions
}
