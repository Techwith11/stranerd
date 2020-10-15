<template>
	<Default>
		<banner>
			<h1 class="text-capitalize">Modify questions under {{ $route.params.module }}</h1>
		</banner>
		<helper-spinner v-if="loading"/>
		<div class="container-fluid py-3" v-else>
			<helper-message :message="error" v-if="error" />
			<div v-else>
				<div class="row">
					<div class="col-lg-6" v-for="question in questions" :key="question.id">
						<question-card :question="question"/>
					</div>
				</div>
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderQuestions">
						<i class="fas fa-spinner fa-spin mr-2" v-if="olderQuestionsLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import QuestionCard from '@application/components/admin/questions/list/QuestionCard.vue'
import router from '@application/router'
import { useTutorQuestionsList } from '@application/usecases/tests/tutorQuestions'
import Question from '@application/components/tests/tutors/Question.vue'
export default defineComponent({
	name: 'Questions',
	components: {
		Question,
		'question-card': QuestionCard
	},
	setup(){
		const { subject, module } = router.currentRoute.params
		const { questions, loading, error, hasMore, olderQuestionsLoading, fetchOlderQuestions } = useTutorQuestionsList(subject, module)
		return { questions, loading, error, hasMore, olderQuestionsLoading, fetchOlderQuestions }
	},
	meta(){
		return {
			title: `${(this.module && (this.module as any)?.[0].toUpperCase() + (this.module as any)?.slice(1).toLowerCase()) ?? ''} Tutors Tests Questions`,
			meta: [
				{
					vmid: 'robots',
					name: 'robots',
					content: 'none'
				}
			]
		}
	}
})
</script>
