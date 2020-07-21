<template>
	<Default>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No courses available at the moment. Check again later" v-if="courses.length === 0" />
			<div v-else>
				<div class="container">
					<div class="card-deck">
						<div class="col-lg-6 p-0" v-for="course in courses" :key="course['.key']">
							<course-card :course="course"/>
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
	</Default>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import CourseCard from '@/components/courses/list/CourseCard'
	export default {
		name: 'Courses',
		data: () => ({
			isLoading: true,
			isOlderCoursesLoading: false,
			courses: [],
			fetched: false,
			listener: () => {},
			paginationLimit: 24,
			hasMore: true
		}),
		components: {
			'course-card': CourseCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		async mounted(){
			await this.getCourses()
			this.fetched = true
			this.isLoading = false
			window.Fire.$on('CourseEdited', course => {
				let index = this.courses.findIndex(c => c['.key'] === course['.key'])
				this.courses[index] = course
				this.$forceUpdate()
			})
			window.Fire.$on('CourseDeleted', course => this.courses = this.courses.filter(c => c['.key'] !== course['.key']))
		},
		async activated(){
			if(this.fetched){
				await this.setCoursesListeners()
			}
		},
		deactivated(){
			this.listener()
		},
		methods: {
			async getCourses(){
				try{
					let docs = firestore.collection('courses')
						.where('subject','==',this.$route.params.subject.toLowerCase())
						.where('module','==',this.$route.params.module.toLowerCase())
						.orderBy('dates.updatedAt','desc')
						.limit(this.paginationLimit)
					let lastItem = this.courses[this.courses.length - 1]
					if(lastItem){
						docs = docs.where('dates.updatedAt','<',lastItem.dates.createdAt)
					}
					docs = await docs.get()
					this.hasMore = docs.size >= this.paginationLimit
					docs.forEach(doc => this.courses.push({ '.key': doc.id, ...doc.data() }))
				}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching courses. Try refreshing the page' }) }
			},
			async fetchOlderCourses(){
				this.isOlderCoursesLoading = true
				await this.getCourses()
				this.isOlderCoursesLoading = false
			},
			async setCoursesListeners(){
				let lastItem = this.courses[this.courses.length - 1]
				let query = firestore.collection('courses')
					.where('subject','==',this.$route.params.subject.toLowerCase())
					.where('module','==',this.$route.params.module.toLowerCase())
					.orderBy('dates.updatedAt')
				if(lastItem){
					query = query.where('dates.updatedAt','>',lastItem.dates.updatedAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.courses.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.courses.unshift({ '.key': doc.id, ...doc.data() })
						}else{
							this.courses[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			},
		},
		meta(){
			return {
				title: this.$route.params.module ? this.$route.params.module[0].toUpperCase() + this.$route.params.module.slice(1).toLowerCase() : 'Module Name',
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
	}
</script>
