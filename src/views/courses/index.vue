<template>
	<div>
		<course-nav />
		<course-fab />
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
	import CourseNav from '@/components/courses/list/CourseNav'
	import CourseCard from '@/components/courses/list/CourseCard'
	import CourseFAB from '@/components/courses/list/CourseFAB'
	export default {
		name: 'Courses',
		components: {
			'course-nav': CourseNav,
			'course-card': CourseCard,
			'course-fab': CourseFAB,
		},
		data: () => ({
			courses: [
				{'.key':1,tags: ['Mathematics','Chemistry']},
				{'.key':2,tags: ['Mathematics','Physics']},
				{'.key':3,tags: ['Physics','Chemistry']},
				{'.key':4,tags: ['Chemistry']},
				{'.key':5,tags: ['Mathematics']},
				{'.key':6,tags: ['Physics']},
			]
		}),
		computed: {
			filteredCourses(){
				let tag = this.$route.query.tab
				return tag ? this.courses.filter(video => video.tags.includes(tag)) : this.courses
			},
		}
	}
</script>