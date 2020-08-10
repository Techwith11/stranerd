import { computed, reactive, ref } from '@vue/composition-api'
import UserEntity from '@root/modules/users/domain/entities/user'
import { FindUser, GetTutors } from '@root/modules/users'
import store from '@/store'
import router from '@/router'
import { notify } from '@/config/notifications'

const users: UserEntity[] = reactive([])
const globalState = reactive({
	fetched: false,
	loading: false,
	error: '',
	tutors: [] as UserEntity[]
})

const addToUsersList = (user: UserEntity) => {
	const index = users.findIndex(u => u.id === user.id)
	if(index === -1) users.push(user)
	else users[index] = user
}

const fetchTutors = async () => {
	globalState.loading = true
	const tutors = await GetTutors.call()
	tutors.forEach(tutor => {
		globalState.tutors.push(tutor)
		addToUsersList(tutor)
	})
	globalState.loading = false
}

export const useTutorsList = () => {
	if(!globalState.fetched) fetchTutors().then(() => {
		globalState.fetched = true
		if(globalState.tutors.length === 0) globalState.error = 'No tutors available at the moment'
	})

	const course = ref('')
	const name = ref('')

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),

		course, name,

		subjects: computed(() => store.getters.getAllSubjects),

		filteredTutors: computed(() => {
			let filtered = globalState.tutors
			if(course.value !== '') filtered = filtered.filter((tutor: UserEntity) => tutor.tutor?.courses.includes(course.value) && tutor.tutor.levels[course.value] > 0)
			return filtered.filter((tutor: UserEntity) => tutor.name.toLowerCase().includes(name.value.toLowerCase()))
		})
	}
}

export const useTopTutorsList = () => {
	if(!globalState.fetched) fetchTutors().then(() => {
		globalState.fetched = true
		if(globalState.tutors.length === 0) globalState.error = 'No tutors available at the moment'
	})

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),

		tutors: computed(() => globalState.tutors.slice(0,3)),
	}
}

export const fetchUser = async (id: string) => {
	let user = users.find(user => user.id === id)
	if(user) return user
	user = await FindUser.call(id)
	if(user) addToUsersList(user)
	return user
}

export const useUser = (id: string) => {
	const state = reactive({
		loading: false,
		user: undefined as UserEntity | undefined,
		error: ''
	})
	const findUser = async () => {
		state.loading = true
		const user = await fetchUser(id)
		if(user) state.user = user
		else{
			await router.push('/tutors')
			await notify({ title: 'No such user found', icon: 'error' })
		}
		state.loading = false
	}
	findUser().catch(() => state.error = 'Failed to fetch user')
	return {
		loading: computed(() => state.loading),
		user: computed(() => state.user),
		error: computed(() => state.error)
	}
}
