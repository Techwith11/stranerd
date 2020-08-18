<template>
	<div class="rounded-xl shadow-sm d-flex flex-column flex-md-row align-items-start p-2">
		<img :src="note.imageLink" alt="">
		<div class="px-2">
			<h5 class="d-flex justify-content-between mb-1">
				<span>{{ note.title }}</span>
				<span class="text-success">${{ note.price }}</span>
			</h5>
			<p class="small mb-1">{{ note.description }}</p>
			<p class="small mb-1">Uploaded {{ note.createdDate }}</p>
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
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
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
