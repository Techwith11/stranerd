<template>
	<div class="m-md-5">
		<subject-form :submit="createSubject" :factory="factory" :loading="loading">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Create Subject</h4>
					<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Add Subject</template>
		</subject-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateSubject } from '@/usecases/courses/subjects'
import SubjectForm from '@/components/admin/subjects/SubjectForm.vue'
import store from '@/store'
export default defineComponent({
	name: 'CreateSubject',
	components: {
		'subject-form': SubjectForm
	},
	setup(){
		const { loading, createSubject, factory } = useCreateSubject()
		return {
			loading, createSubject, factory, module,
			closeCreateModal: () => store.dispatch('closeCreateModal')
		}
	}
})
</script>
