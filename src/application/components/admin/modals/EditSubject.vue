<template>
	<div class="m-md-5">
		<subject-form :submit="editSubject" :factory="factory" :loading="loading">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Edit Subject</h4>
					<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Edit Subject</template>
		</subject-form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import SubjectForm from '@/components/admin/subjects/SubjectForm.vue'
	import { useEditSubject } from '@/usecases/courses/useSubjects'
	import store from '@/store'
	export default defineComponent({
		name: 'EditSubject',
		components: {
			'subject-form': SubjectForm
		},
		setup(){
			const { loading, factory, editSubject } = useEditSubject()
			return {
				loading, factory, editSubject,
				closeEditModal: () => store.dispatch('closeEditModal')
			}
		}
	})
</script>
