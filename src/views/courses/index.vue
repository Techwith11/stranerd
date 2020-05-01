<template>
	<div>
		<course-nav />
		<course-fab v-if="isAdmin" />
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-4" v-for="course in filteredCourses" :key="course['.key']">
					<course-card :course="course" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//TODO: Implement pagination
	import { firestore } from '@/config/firebase'
	import CourseNav from '@/components/courses/list/CourseNav'
	import CourseCard from '@/components/courses/list/CourseCard'
	import CourseFAB from '@/components/courses/list/CourseFAB'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Courses',
		data: () => ({
			courses: []
		}),
		components: {
			'course-nav': CourseNav,
			'course-card': CourseCard,
			'course-fab': CourseFAB,
		},
		async mounted(){
			let docs = await firestore.collection('courses').orderBy('dates.updatedAt','desc').get()
			docs.forEach(doc => this.courses.push({ '.key': doc.id, ...doc.data() }))
		},
		computed: {
			filteredCourses(){
				let tag = this.$route.query.tab
				return tag ? this.courses.filter(video => video.tags.includes(tag)) : this.courses
			},
			...mapGetters(['isAdmin'])
		}
	}
</script>