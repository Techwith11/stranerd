<template>
	<div class="alert alert-warning" role="alert">
		<div v-html="question.title" class="editor-container"></div>
		<p>
			<span class="mr-3">A. {{ question.a }}</span>
			<span class="mr-3">B. {{ question.b }}</span>
			<span class="mr-3">C. {{ question.c }}</span>
			<span class="mr-3">D. {{ question.d }}</span>
		</p>
		<span class="d-block">Answer: {{ question.answer }}</span>
		<span class="d-block">Level {{ question.level }} {{ question.subject }}</span>
		<div class="mt-3">
			<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
			<a class="mr-3 text-danger" @click.prevent="removeQuestion"><i class="fas fa-trash mr-1"></i>Delete</a>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		question: {
			required: true,
			type: Object
		}
	},
	methods: {
		...mapActions(['deleteQuestion','setEditModalQuestion','setEditMeta']),
		async openEditModal(){
			this.setEditMeta(this.question)
			this.setEditModalQuestion()
		},
		async removeQuestion(){
			try{
				let result = await new window.SweetAlert({
					title: 'Delete question',
					text: 'Are you sure you want to delete these question? This cannot be undone',
					icon: 'info',
					showCancelButton: true,
					cancelButtonColor: '#3085d6',
					confirmButtonColor: '#d33',
					confirmButtonText: 'Delete'
				})
				if (result.value) {
					await this.deleteQuestion(this.question['.key'])
					window.Fire.$emit('QuestionDeleted', this.question)
					new window.Toast({ icon: 'success', title: 'Question deleted successfully' })
				}
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		}
	}
}
</script>
