<template>
	<div class="p-2">
		<div class="d-flex flex-column flex-md-row mb-3">
			<img :src="note.imageLink" alt="">
			<div class="p-2">
				<p class="font-weight-500 lead">Buy for &dollar;{{ note.price }}</p>
				<h3 class="font-weight-500">{{ note.title }}</h3>

				<div class="d-flex flex-column" v-if="isAdmin">
					<button class="my-1 btn btn-outline-warning" @click.prevent="openEditModal">
						<i class="fas fa-pen mr-1"></i>
						<span>Edit</span>
					</button>
					<button class="my-1 btn btn-outline-danger" @click.prevent="deleteNote">
						<i class="fas mr-1" :class="loading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
						<span>Delete</span>
					</button>
				</div>
			</div>
		</div>
		<p class="small">{{ note.description }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NoteEntity } from '@modules/shop/domain/entities/note'
import { setCurrentEditingNote, useDeleteNote } from '@/usecases/shop/notes'
import { useStore } from '@/usecases/store'
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
			isAdmin: useStore().auth.isAdmin,
			openEditModal(){
				setCurrentEditingNote(props.note)
				useStore().modals.setEditModalNote()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
	img{ width: 100%; }
	@media (min-width: $md) {
		img{ width: 33.33%; }
	}
</style>
