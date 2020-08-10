import { computed, reactive, ref } from '@vue/composition-api'
import UserEntity from '@root/modules/users/domain/entities/user'
import { GetTutors } from '@root/modules/users'
import store from '@/store'

const globalState = reactive({
	fetched: false,
	loading: false,
	error: '',
	tutors: [] as UserEntity[]
})

const fetchTutors = async () => {
	globalState.loading = true
	const tutors = await GetTutors.call()
	tutors.forEach(tutor => globalState.tutors.push(tutor))
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
