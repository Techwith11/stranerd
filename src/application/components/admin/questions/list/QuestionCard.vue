<template>
	<div class="alert alert-warning" role="alert">
		<div v-html="question.title" class="editor-container"></div>
		<p>
			<span class="d-block my-1">A. {{ question.a }}</span>
			<span class="d-block my-1">B. {{ question.b }}</span>
			<span class="d-block my-1">C. {{ question.c }}</span>
			<span class="d-block my-1">D. {{ question.d }}</span>
		</p>
		<span class="d-block">Answer: {{ question.answer }}</span>
		<span class="d-block">Level {{ question.level }} {{ question.subject }}</span>
		<div class="ml-auto" v-if="isAdmin">
			<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
			<a class="text-danger" @click.prevent="deleteTutorQuestion">
				<loading class="mr-1" v-if="delLoading" />
				<i class="fas mr-1 fa-trash" v-else></i>
				<span>Delete</span>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@application/usecases/store'
import { QuestionEntity } from '@modules/tests/domain/entities/question'
import { setCurrentEditingTutorQuestion, useDeleteTutorQuestion } from '@application/usecases/tests/tutorQuestions'
export default defineComponent({
	props: {
		question: {
			required: true,
			type: QuestionEntity
		}
	},
	setup(props){
		const { loading: delLoading, deleteTutorQuestion } = useDeleteTutorQuestion(props.question)
		return {
			isAdmin: useStore().auth.isAdmin,
			deleteTutorQuestion, delLoading,
			openEditModal: () => {
				setCurrentEditingTutorQuestion(props.question)
				useStore().modals.setEditModalQuestion()
			}
		}
	}
})
</script>
