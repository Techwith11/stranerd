<template>
	<div class="my-md-5">
		<note-form :submit="editNote" :loading="loading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Edit Note</h4>
					<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Save Note</template>
		</note-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useEditNote } from '@application/usecases/shop/notes'
import NoteForm from '@application/components/admin/notes/NoteForm.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'EditNote',
	components: {
		'note-form': NoteForm
	},
	setup(){
		const { loading, editNote, factory } = useEditNote()
		return {
			loading, editNote, factory,
			closeEditModal: useStore().modals.closeEditModal
		}
	},
})
</script>
