<template>
	<div>
		<question-nav class="mb-3" />
		<div class="container">
			<question-card :question="question" v-for="question in filteredQuestions" :key="question['.key']" />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import QuestionNav from '@/components/admin/questions/list/QuestionNav'
	import QuestionCard from '@/components/admin/questions/list/QuestionCard'
	export default {
		name: 'Questions',
		data: () => ({
			questions: [],
			subjects: []
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
			let subDocs = await firestore.collection('subjects').get()
			subDocs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
			//TODO: Implement pagination for questions
			let quesDocs = await firestore.collection('tests/tutors/questions').orderBy('dates.createdAt','desc').get()
			quesDocs.forEach(doc => this.questions.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'question-nav': QuestionNav,
			'question-card': QuestionCard
		}
	}
</script>