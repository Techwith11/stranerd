<template>
	<div class="my-md-5">
		<question-form :loading="loading" :factory="factory" :submit="createQuestion">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Create Tutor Question</h4>
					<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Create Question</template>
		</question-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateTutorQuestion } from '@application/usecases/tests/tutorQuestions'
import { useStore } from '@application/usecases/store'
import QuestionForm from '@application/components/admin/questions/QuestionForm.vue'
export default defineComponent({
	name: 'CreateQuestion',
	components: {
		'question-form': QuestionForm
	},
	setup(){
		const { loading, createQuestion, factory } = useCreateTutorQuestion()
		return {
			loading, createQuestion, factory,
			closeCreateModal: useStore().modals.closeCreateModal
		}
	}
})
</script>
