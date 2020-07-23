<template>
	<div class="p-3 shadow-sm white">
		<p class="text-muted">Recent Courses</p>
		<div v-if="courses.length > 0">
			<course-card v-for="course in courses" :key="course['.key']" :course="course" />
			<div class="d-flex justify-content-end mb-3">
				<router-link class="btn btn-primary text-decoration-none" to="/courses">See More</router-link>
			</div>
		</div>
		<p class="lead" v-else>No courses available at the moment.</p>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import CourseCard from '@/components/courses/list/CourseCard'
	export default {
		data: () => ({
			courses: [],
		}),
		async mounted(){
			try{
				let docs = await firestore.collection('courses').orderBy('dates.createdAt','desc').limit(1).get()
				docs.forEach(doc => this.courses.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching recent courses. Try refreshing the page' }) }
		},
		components: {
			'course-card': CourseCard
		}
	}
</script>
