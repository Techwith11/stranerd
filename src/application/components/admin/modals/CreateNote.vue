<template>
	<div class="my-md-5">
		<note-form :submit="createNote" :loading="loading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Create Note</h4>
					<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Create Note</template>
		</note-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateNote } from '@application/usecases/shop/notes'
import NoteForm from '@application/components/admin/notes/NoteForm.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'CreateNote',
	components: {
		'note-form': NoteForm
	},
	setup(){
		const { loading, createNote, factory } = useCreateNote()
		return {
			loading, createNote, factory,
			closeCreateModal: useStore().modals.closeCreateModal
		}
	},
})
</script>
