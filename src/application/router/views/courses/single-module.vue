<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1 class="text-capitalize">All courses for {{ $route.params.module }}</h1>
				<course-search class="my-2" />
			</div>
		</banner>
		<helper-spinner v-if="loading"/>
		<div class="container-fluid py-3" v-else>
			<helper-message :message="error" v-if="error" />
			<div v-else>
				<div class="grid">
					<div class="card rounded-xl shadow-sm p-3" v-for="course in courses" :key="course.id">
						<course-card :course="course"/>
					</div>
				</div>
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderCourses">
						<i class="fas fa-spinner fa-spin mr-2" v-if="olderCoursesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CourseCard from '@application/components/courses/list/CourseCard.vue'
import { useCoursesList } from '@application/usecases/courses/courses'
import router from '@application/router'
import { capitalizeText } from '@modules/core/validations/sanitizers'
import CourseSearch from '@application/components/helpers/search/CourseSearch.vue'
export default defineComponent({
	name: 'Courses',
	components: {
		'course-card': CourseCard,
		'course-search': CourseSearch
	},
	setup(){
		const { subject, module } = router.currentRoute.params
		const { courses, loading, error, hasMore, olderCoursesLoading, fetchOlderCourses } = useCoursesList(subject, module)
		return { courses, loading, error, hasMore, olderCoursesLoading, fetchOlderCourses }
	},
	meta(){
		const { module } = router.currentRoute.params
		return {
			title: capitalizeText(module) ?? 'Module Name',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: ''
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: [].join(', ')
				}
			]
		}
	}
})
</script>

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 2rem;
}
@media (min-width: $md) {
	.grid{
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
