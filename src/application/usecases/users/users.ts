import { computed, reactive, ref } from '@vue/composition-api'
import { UserEntity } from '@root/modules/users/domain/entities/user'
import { FindUser, GetTutors } from '@root/modules/users'
import store from '@/store'
import router from '@/router'
import { Notify } from '@/config/notifications'
import { firestore } from '@root/services/firebase'

const users: UserEntity[] = reactive([])
const globalState = reactive({
	fetched: false,
	loading: false,
	error: '',
	tutors: [] as UserEntity[]
})

const addToUsersList = (user: UserEntity) => {
	const index = users.findIndex((u) => u.id === user.id)
	if(index === -1) users.push(user)
	else users[index] = user
}

const fetchTutors = async () => {
	globalState.loading = true
	const tutors = await GetTutors.call()
	tutors.forEach((tutor) => {
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
	const index = users.findIndex((user) => user.id === id)
	if(index === -1) {
		const user = await FindUser.call(id)
		if(user) addToUsersList(user)
	}
	return computed(() => users.find((user) => user.id === id)).value
}

const userStates: {[key:string]: {loading:boolean,error:string, user: UserEntity | undefined, sessions: object[]}} = {}
export const useUser = (id: string) => {
	if(userStates[id] === undefined){
		userStates[id] = reactive({
			loading: false,
			user: undefined as UserEntity | undefined,
			error: '',
			sessions: []
		})
		const findUser = async () => {
			userStates[id].loading = true
			const user = await fetchUser(id)
			if(user) {
				userStates[id].user = user
				if(user.roles.isTutor && user.tutor?.canTeach){
					let docs = await firestore.collection('sessions').where('tutor','==',id)
						.where('cancelled.student','==',false)
						.where('cancelled.tutor','==',false)
						.orderBy('dates.createdAt','desc')
						.limit(12)
						.get()
					userStates[id].sessions = []
					docs.forEach((doc) => userStates[id].sessions.push({ '.key': doc.id, ...doc.data() }))
				}
			}
			else{
				await router.replace('/tutors')
				await Notify({ title: 'No such user found', icon: 'error' })
			}
			userStates[id].loading = false
		}
		findUser().catch(() => userStates[id].error = 'Failed to fetch user')
	}
	//TODO: consider using listeners for user instead of one time getters

	return {
		loading: computed(() => userStates[id].loading),
		user: computed(() => userStates[id].user),
		sessions: computed(() => userStates[id].sessions),
		error: computed(() => userStates[id].error)
	}
}
