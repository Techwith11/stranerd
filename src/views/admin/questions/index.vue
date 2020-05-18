<template>
	<div>
		<question-nav class="mb-3" />
		<div class="container">
			<div class="alert alert-warning" role="alert" v-for="question in filteredQuestions" :key="question.title">
				<p>{{ question.title }}</p>
				<p>
					<span class="mr-3">A. {{ question.a }}</span>
					<span class="mr-3">B. {{ question.b }}</span>
					<span class="mr-3">C. {{ question.c }}</span>
					<span class="mr-3">D. {{ question.d }}</span>
				</p>
				<span class="d-block">Answer: {{ question.answer }}</span>
				<span class="d-block">Level {{ question.level }} {{ question.subject }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import QuestionNav from '@/components/admin/questions/list/QuestionNav'
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
			//TODO: Implement Pagination
			let subDocs = await firestore.collection('subjects').get()
			subDocs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
			//TODO: Implement pagination for questions
			let quesDocs = await firestore.collection('questions').orderBy('createdAt','desc').get()
			quesDocs.forEach(doc => this.questions.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'question-nav': QuestionNav
		}
	}
</script>