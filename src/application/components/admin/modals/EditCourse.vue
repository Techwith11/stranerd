<template>
	<div class="my-md-5">
		<course-form :submit="editCourse" :loading="loading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Edit Course</h4>
					<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Save Course</template>
		</course-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useEditCourse } from '@application/usecases/courses/courses'
import CourseForm from '@application/components/courses/CourseForm.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'EditCourse',
	components: {
		'course-form': CourseForm
	},
	setup(){
		const { loading, editCourse, factory } = useEditCourse()
		return {
			loading, editCourse, factory,
			closeEditModal: useStore().modals.closeEditModal
		}
	},
})
</script>
