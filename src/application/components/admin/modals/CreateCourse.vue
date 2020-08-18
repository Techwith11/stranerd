<template>
	<div class="my-md-5">
		<course-form :submit="createCourse" :loading="loading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Create Course</h4>
					<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Create Course</template>
		</course-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import store from '@/store'
import { useCreateCourse } from '@/usecases/courses/courses'
import CourseForm from '@/components/courses/CourseForm.vue'
export default defineComponent({
	name: 'CreateCourse',
	components: {
		'course-form': CourseForm
	},
	setup(){
		const { loading, createCourse, factory } = useCreateCourse()
		return {
			loading, createCourse, factory,
			closeCreateModal: () => store.dispatch('closeCreateModal')
		}
	},
})
</script>
