<template>
	<div class="alert alert-warning my-3" role="alert">
		<div class="mb-1 font-weight-bold d-flex justify-content-between">
			<span>{{ note.title }}</span>
			<span class="text-success">&dollar;{{ note.price }}</span>
		</div>
		<p class="mb-1">{{ note.description }}</p>
		<p class="mb-1 small">Uploaded {{ note.createdDate }}</p>
		<template v-if="isAdmin">
			<a class="mr-3 text-warning" @click.prevent="openEditModal">
				<i class="fas fa-pen mr-1"></i>
				<span>Edit</span>
			</a>
			<a class="mr-3 text-danger" @click.prevent="deleteNote">
				<i class="fas mr-1" :class="loading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
				<span>Delete</span>
			</a>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, computed } from '@vue/composition-api'
	import { NoteEntity } from '@root/modules/shop/domain/entities/note'
	import { setCurrentEditingNote, useDeleteNote } from '@/usecases/shop/useNotes'
	import store from '@/store'
	export default defineComponent({
		props: {
			note: {
				required: true,
				type: NoteEntity
			}
		},
		setup(props){
			const { loading, deleteNote } = useDeleteNote(props.note)
			return {
				loading, deleteNote,
				isAdmin: computed(() => store.getters.isAdmin),
				openEditModal(){
					setCurrentEditingNote(props.note)
					store.dispatch('setEditModalNote')
				}
			}
		}
	})
</script>
