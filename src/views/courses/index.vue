<template>
	<div>
		<course-nav />
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No courses available at the moment. Check again later" v-if="courses.length === 0" />
			<div v-else>
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-4" v-for="course in filteredCourses" :key="course['.key']">
							<course-card :course="course" />
						</div>
					</div>
					<div class="d-flex justify-content-end my-3" v-if="hasMore">
						<button class="btn-success" @click="fetchOlderCourses">
							<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderCoursesLoading"></i>
							<span>Fetch More</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import CourseNav from '@/components/courses/list/CourseNav'
	import CourseCard from '@/components/courses/list/CourseCard'
	export default {
		name: 'Courses',
		data: () => ({
			isLoading: true,
			isOlderCoursesLoading: false,
			courses: [],
			paginationLimit: 24,
			hasMore: true
		}),
		components: {
			'course-nav': CourseNav,
			'course-card': CourseCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		async mounted(){
			await this.getCourses()
			this.isLoading = false
		},
		computed: {
			filteredCourses(){
				let tag = this.$route.query.tab
				return tag ? this.courses.filter(video => video.tags.includes(tag)) : this.courses
			}
		},
		methods: {
			async getCourses(){
				let docs = firestore.collection('courses').orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				let lastItem = this.courses[this.courses.length - 1]
				if(lastItem){
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => this.courses.push({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderCourses(){
				this.isOlderCoursesLoading = true
				await this.getCourses()
				this.isOlderCoursesLoading = false
			}
		}
	}
</script>