<template>
	<form class="d-flex flex-column flex-lg-row align-items-lg-center" @submit.prevent="createDiscussion">
		<div class="form-group flex-grow-1">
			<textarea rows="3" class="form-control my-2 mr-lg-4" placeholder="Comment ..." v-model="factory.body"></textarea>
			<small class="small text-danger" v-if="factory.errors.body">{{ factory.errors.body }}</small>
		</div>
		<button class="btn-success ml-lg-2" type="submit" :disabled="!factory.valid|| loading">
			<loading class="mr-2" v-if="loading" />
			<span>Send</span>
		</button>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { useCreateDiscussion } from '@application/usecases/courses/discussion'
export default defineComponent({
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	},
	setup(props){
		const { loading, factory, createDiscussion } = useCreateDiscussion(props.course.id)
		return { loading, factory, createDiscussion }
	}
})
</script>
