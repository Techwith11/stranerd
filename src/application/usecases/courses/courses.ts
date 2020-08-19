import { computed, reactive } from '@vue/composition-api'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import {
	AddCourse, DeleteCourse, FindCourse,
	GetCourseFactory, GetCoursesByModule, GetRecentCourses, UpdateCourse
} from '@root/modules/courses'
import { Alert, Notify } from '@/config/notifications'
import router from '@/router'
import { useStore } from '@/usecases/store'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
const getKey = (subject: string, module: string) => `${subject}_${module}`
const getNewState = () => reactive({
	courses: [],
	fetched: false,
	loading: false,
	error: '',
	hasMore: true,
	olderCoursesLoading: false
})

const globalState = reactive({}) as {
	[key: string]: {
		courses: CourseEntity[],
		fetched: boolean,
		loading: boolean,
		error: string,
		hasMore: boolean,
		olderCoursesLoading: boolean
	}
}

const setCourse = (subject: string, module: string, course: CourseEntity) => {
	const key = getKey(subject, module)
	if(!globalState[key]) globalState[key] = getNewState()
	const index = globalState[key].courses.findIndex((p) => p.id === course.id)
	if(index !== -1) globalState[key].courses[index] = course
	else globalState[key].courses.push(course)
}
const unshiftCourse = (subject: string, module: string, course: CourseEntity) => {
	const key = getKey(subject, module)
	if(!globalState[key]) globalState[key] = getNewState()
	const index = globalState[getKey(subject, module)].courses.findIndex((p) => p.id === course.id)
	if(index !== -1) globalState[getKey(subject, module)].courses[index] = course
	else globalState[getKey(subject, module)].courses.unshift(course)
}
const fetchCourses = async (subject: string, module: string) => {
	const key = getKey(subject, module)
	const date = globalState[key]?.courses[globalState[key]?.courses?.length - 1]?.createdAt ?? undefined
	const entities: CourseEntity[] = await GetCoursesByModule.call(subject, module, date)
	globalState[key].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach((entity) => setCourse(subject, module, entity))
}
const fetchCoursesOnInit = async (subject: string, module: string) => {
	globalState[getKey(subject, module)].loading = true
	await fetchCourses(subject, module).catch(() => globalState[getKey(subject, module)].error = 'Failed to fetch courses')
	if(globalState[getKey(subject, module)].courses.length === 0) globalState[getKey(subject, module)].error = `No courses found for ${module} at the moment. Check again later`
	globalState[getKey(subject, module)].loading = false
}
const fetchOlderCourses = async (subject: string, module: string) => {
	globalState[getKey(subject, module)].olderCoursesLoading = true
	await fetchCourses(subject, module)
	globalState[getKey(subject, module)].olderCoursesLoading = true
}

export const useCoursesList = (subject: string, module: string) => {
	const key = getKey(subject, module)

	if(!globalState[key]) globalState[key] = getNewState()
	if(!globalState[key].fetched) fetchCoursesOnInit(subject, module).then(() => globalState[key].fetched = true)

	return {
		loading: computed(() => globalState[key].loading),
		olderCoursesLoading: computed(() => globalState[key].olderCoursesLoading),
		hasMore: computed(() => globalState[key].hasMore),
		error: computed(() => globalState[key].error),

		courses: computed(() => globalState[key].courses),

		fetchOlderCourses: async () => await fetchOlderCourses(subject, module)
	}
}

export const useDeleteCourse = (course: CourseEntity) => {
	const key = getKey(course.subject, course.module)
	const state = reactive({
		loading: false
	})

	const deleteCourse = async () => {
		const res = await Alert({
			title: `Delete ${course.title}`,
			text: 'Are you sure you want to delete this course',
			icon: 'info',
			confirmButtonText: 'Delete'
		})
		if(res.value){
			try{
				state.loading = true
				await DeleteCourse.call(course.id)
				globalState[key].courses = globalState[key].courses.filter((c) => c.id !== course.id)
				state.loading = false
				const { id, subject, module } = router.currentRoute.params
				if(id) await router.replace(`/courses/${subject}/${module}`)
				await Notify({ title: 'Course deleted!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
		}
	}

	return { loading: computed(() => state.loading), deleteCourse }
}

const fetchCourse = async (id: string) => {
	let course: CourseEntity | undefined = undefined
	const values = Object.values(globalState)
	values.forEach((state) => {
		const found = state.courses.find((course) => course.id === id)
		if(found) course = found
	})
	if(course) return course
	course = await FindCourse.call(id)
	if(course) unshiftCourse(course.subject, course.module, course)
	return course
}
export const useSingleCourse = (id: string) => {
	const state = reactive({
		loading: false,
		course: undefined as CourseEntity | undefined,
		error: ''
	})
	const findCourse = async () => {
		state.loading = true
		const course = await fetchCourse(id)
		if(course) state.course = course
		else{
			await router.replace('/courses')
			await Notify({ title: 'No such course found', icon: 'error' })
		}
		state.loading = false
	}
	findCourse().catch(() => state.error = 'Failed to fetch course')
	return {
		loading: computed(() => state.loading),
		error: computed(() => state.error),
		course: computed(() => state.course),
	}
}

export const useCreateCourse = () => {
	const state = reactive({
		loading: false,
		factory: GetCourseFactory.call()
	})

	state.factory.userId = useStore().auth.getId.value

	const createCourse = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try{
				const id = await AddCourse.call(state.factory)
				const course = await fetchCourse(id)
				if(course){
					unshiftCourse(course.subject, course.module, course)
					await router.push(`/courses/${course.subject}/${course.module}/${course.id}`)
				}
				state.factory.reset()
				await useStore().modals.closeCreateModal()
				await Notify({ icon: 'success', title: 'Course created successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		createCourse,
	}
}

let currentEdit = undefined as CourseEntity | undefined

export const setCurrentEditingCourse = (course: CourseEntity) => currentEdit = course

export const useEditCourse = () => {
	const state = reactive({
		loading: false,
		factory: GetCourseFactory.call()
	})
	if(currentEdit !== undefined) state.factory.loadEntity(currentEdit)
	const editCourse = async () => {
		if(state.factory.valid && !state.loading) {
			state.loading = true
			try{
				const id = await UpdateCourse.call(currentEdit!.id ,state.factory)
				const course = await FindCourse.call(id)
				if(course){
					unshiftCourse(course.subject, course.module, course)
					if(router.currentRoute.params.id) await router.push(`/courses/${course.subject}/${course.module}`)
					await router.push(`/courses/${course.subject}/${course.module}/${course.id}`)
				}
				state.factory.reset()
				await useStore().modals.closeEditModal()
				await Notify({ title: 'Course updated successfully!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}
	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		editCourse
	}
}

export const useRecentCourses = () => {
	const state = reactive({
		loading: false,
		courses: [] as CourseEntity[],
		error: ''
	})
	const fetchRecentCourse = async () => {
		let allCourses = Object.values(globalState).reduce((total:CourseEntity[], value) => {
			if(value.courses[0]) total.push(value.courses[0])
			return total
		},[])
		if(allCourses.length > 0){
			allCourses = allCourses.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
		}else{
			const courses = await GetRecentCourses.call()
			courses.forEach((course) => unshiftCourse(course.subject, course.module, course))
			allCourses.push(...courses)
		}
		state.courses.push(...allCourses)
	}
	fetchRecentCourse().catch(() => state.error = 'Error fetching recent courses')
	return {
		loading: computed(() => state.loading),
		error: computed(() => state.error),
		courses: computed(() => state.courses)
	}
}
