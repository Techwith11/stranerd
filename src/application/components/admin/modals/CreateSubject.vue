<template>
	<div class="m-md-5">
		<subject-form :submit="createSubject" :factory="factory" :loading="loading">
			<template slot="title">Add Subject</template>
			<template slot="buttonText">Add Subject</template>
		</subject-form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useCreateSubject } from '@/usecases/courses/useSubjects'
	import SubjectForm from '@/components/admin/subjects/SubjectForm.vue'
	export default defineComponent({
		name: 'CreateSubject',
		components: {
			'subject-form': SubjectForm
		},
		setup(){
			const { loading, createSubject, factory } = useCreateSubject()
			return {
				loading, createSubject, factory, module
			}
		}
	})
</script>
