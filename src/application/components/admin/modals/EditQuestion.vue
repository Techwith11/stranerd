<template>
	<div class="my-md-5">
		<question-form :loading="loading" :factory="factory" :submit="editQuestion">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Update Tutor Question</h4>
					<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Save Question</template>
		</question-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useEditTutorQuestion } from '@root/application/usecases/tests/tutorQuestions'
import { useStore } from '@/usecases/store'
import QuestionForm from '@/components/admin/questions/QuestionForm.vue'
export default defineComponent({
	name: 'EditQuestion',
	components: {
		'question-form': QuestionForm
	},
	setup(){
		const { loading, editQuestion, factory } = useEditTutorQuestion()
		return {
			loading, editQuestion, factory,
			closeEditModal: useStore().modals.closeEditModal
		}
	}
})
</script>
