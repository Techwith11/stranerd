<template>
	<div class="p-3 shadow-sm white">
		<page-loading v-if="loading" />
		<p class="text-muted txt-shadow">Recent Courses</p>
		<div v-if="courses.length > 0">
			<course-card v-for="course in courses" :key="course.id" :course="course" />
			<div class="d-flex justify-content-end mb-3">
				<router-link class="text-decoration-none txt-shadow" to="/courses">See More</router-link>
			</div>
		</div>
		<helper-message class="lead" v-if="error" :message="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CourseCard from '@application/components/courses/list/CourseCard.vue'
import { useRecentCourses } from '@application/usecases/courses/courses'
export default defineComponent({
	setup(){
		const { loading, error, courses } = useRecentCourses()
		return { loading, error, courses }
	},
	components: {
		'course-card': CourseCard
	}
})
</script>
