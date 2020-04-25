<template>
	<div>
		<div class="container">
			<h3 class="text-center">Questions</h3>
		</div>
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
	import QuestionNav from '@/components/questions/list/QuestionNav'
	export default {
		name: 'Questions',
		computed: {
			getCourses() {
				return this.$route.query.tab ? [this.$route.query.tab] : this.subjects.map(subject => subject.name)
			},
			filteredQuestions() {
				return this.questions.filter(question => this.getCourses.includes(question.subject))
			}
		},
		firestore() {
			return {
				questions: firestore.collection('questions'),
				subjects: firestore.collection('subjects'),
			}
		},
		components: {
			'question-nav': QuestionNav
		}
	}
</script>