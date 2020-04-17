<template>
	<div>
		<course-nav />
		<course-fab />
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-4" v-for="course in coursesByTag" :key="course['.key']">
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
			videos: [
				{'.key':1,tags: ['maths','chemistry']},
				{'.key':2,tags: ['maths','physics']},
				{'.key':3,tags: ['physics','chemistry']},
				{'.key':4,tags: ['chemistry']},
				{'.key':5,tags: ['maths']},
				{'.key':6,tags: ['physics']},
			]
		}),
		computed: {
			coursesByTag(){
				let tag = this.$route.query.tab
				return tag ? this.videos.filter(video => video.tags.includes(tag)) : this.videos
			},
		}
	}
</script>