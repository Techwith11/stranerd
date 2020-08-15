import { computed, reactive } from '@vue/composition-api'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import { DeleteCourse, GetCoursesByModule } from '@root/modules/courses'
import { Alert, Notify } from '@/config/notifications'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
const getKey = (subject: string, module: string) => `${subject}_${module}`

const globalState = reactive({}) as {
	[key: string]: {
		courses: CourseEntity[],
		loading: boolean,
		error: string,
		hasMore: boolean,
		olderCoursesLoading: boolean
	}
}

const setCourse = (subject: string, module: string, course: CourseEntity) => {
	const index = globalState[getKey(subject, module)].courses.findIndex(p => p.id === course.id)
	if(index !== -1) globalState[getKey(subject, module)].courses[index] = course
	else globalState[getKey(subject, module)].courses.push(course)
}
const unshiftCourse = (subject: string, module: string, course: CourseEntity) => {
	const index = globalState[getKey(subject, module)].courses.findIndex(p => p.id === course.id)
	if(index !== -1) globalState[getKey(subject, module)].courses[index] = course
	else globalState[getKey(subject, module)].courses.unshift(course)
}
const fetchCourses = async (subject: string, module: string) => {
	const date = globalState[getKey(subject, module)]?.courses[0]?.createdAt ?? undefined
	const entities: CourseEntity[] = await GetCoursesByModule.call(subject, module, date)
	globalState[getKey(subject, module)].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach(entity => setCourse(subject, module, entity))
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
	if(globalState[key] === undefined){
		globalState[key] = reactive({
			courses: [],
			loading: false,
			error: '',
			hasMore: true,
			olderCoursesLoading: false
		})
		fetchCoursesOnInit(subject, module)
	}

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
				globalState[key].courses = globalState[key].courses.filter(c => c.id !== course.id)
				state.loading = false
				await Notify({ title: 'Subject deleted!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
		}
	}

	return { loading: computed(() => state.loading), deleteCourse }
}
