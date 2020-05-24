<template>
	<div>
		<question-nav class="mb-3" :subjects="subjects" />
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No questions available at the moment. Try adding some new ones." v-if="questions.length === 0" />
			<div v-else>
				<div class="container">
					<question-card :question="question" v-for="question in filteredQuestions" :key="question['.key']" />
					<div class="d-flex justify-content-end mb-3" v-if="hasMore">
						<button class="btn-success" @click="fetchOlderQuestions">
							<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderQuestionsLoading"></i>
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
	import QuestionNav from '@/components/admin/questions/list/QuestionNav'
	import QuestionCard from '@/components/admin/questions/list/QuestionCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'Questions',
		data: () => ({
			questions: [],
			subjects: [],
			isLoading: true,
			isOlderQuestionsLoading: false,
			paginationLimit: 24,
			hasMore: true
		}),
		computed: {
			getCourses() {
				return this.$route.query.tab ? [this.$route.query.tab] : this.subjects.map(subject => subject.name)
			},
			filteredQuestions() {
				return this.questions.filter(question => this.getCourses.includes(question.subject))
			}
		},
		async mounted() {
			await this.getSubjects()
			await this.getQuestions()
			this.isLoading = false
		},
		components: {
			'question-nav': QuestionNav,
			'question-card': QuestionCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		methods: {
			async getSubjects(){
				let docs = await firestore.collection('subjects').get()
				docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
			},
			async getQuestions(){
				let docs = firestore.collection('tests/tutors/questions').orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				let lastItem = this.questions[this.questions.length - 1]
				if(lastItem){
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => this.questions.push({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderQuestions(){
				this.isOlderQuestionsLoading = true
				await this.getQuestions()
				this.isOlderQuestionsLoading = false
			}
		}
	}
</script>