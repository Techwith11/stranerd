<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No questions available at the moment. Try adding some new ones." v-if="questions.length === 0" />
			<div class="container pt-3" v-else>
				<question-card :question="question" v-for="question in questions" :key="question['.key']" />
				<div class="d-flex justify-content-end mb-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderQuestions">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderQuestionsLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import QuestionCard from '@/components/admin/questions/list/QuestionCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'Questions',
		data: () => ({
			questions: [],
			isLoading: true,
			isOlderQuestionsLoading: false,
			fetched: false,
			listener: () => {},
			paginationLimit: 24,
			hasMore: true
		}),
		async mounted() {
			await this.getQuestions()
			this.fetched = true
			this.isLoading = false
			window.Fire.$on('QuestionEdited', question => {
				let index = this.questions.findIndex(q => q['.key'] === question['.key'])
				this.questions[index] = question
				this.$forceUpdate()
			})
			window.Fire.$on('QuestionDeleted', question => this.questions = this.questions.filter(q => q['.key'] !== question['.key']))
		},
		async activated(){
			if(this.fetched){
				await this.setQuestionsListeners()
			}
		},
		deactivated(){
			this.listener()
		},
		components: {
			'question-card': QuestionCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		computed: {
			subject(){ return this.$route.params.subject || '' },
			module(){ return this.$route.params.module || '' }
		},
		methods: {
			async getQuestions(){
				let docs = firestore.collection('tests/tutors/questions').orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
					.where('subject','==', this.subject.toLowerCase())
					.where('module','==', this.module.toLowerCase())
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
			},
			async setQuestionsListeners(){
				let lastItem = this.questions[this.questions.length - 1]
				let query = firestore.collection('tests/tutors/questions')
					.where('subject','==', this.subject.toLowerCase())
					.where('module','==', this.module.toLowerCase())
					.orderBy('dates.createdAt')
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.questions.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.questions.unshift({ '.key': doc.id, ...doc.data() })
						}else{
							this.questions[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			},
		},
		meta(){
			return {
				title: `${this.module && this.module[0].toUpperCase() + this.module.slice(1).toLowerCase()} Tutors Tests Questions`,
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>
