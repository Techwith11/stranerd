<template>
	<div class="alert alert-warning my-3" role="alert">
		<div class="mb-1 font-weight-bold d-flex justify-content-between">
			<span>{{ note.title }}</span>
			<span class="text-success">&dollar;{{ note.price }}</span>
		</div>
		<p class="mb-1">{{ note.description }}</p>
		<p class="mb-1 small">Uploaded {{ note.dates.createdAt | getDateOrTime }}</p>
		<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
		<a class="mr-3 text-danger" @click.prevent="removeNote"><i class="fas fa-trash mr-1"></i>Delete</a>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		props: {
			note: {
				required: true,
				type: Object
			}
		},
		methods: {
			...mapActions(['deleteNote','setEditModalNote','setEditMeta']),
			async openEditModal(){
				this.setEditMeta(this.note)
				this.setEditModalNote()
			},
			async removeNote(){
				try{
					let result = await new window.SweetAlert({
						title: 'Delete note',
						text: 'Are you sure you want to delete this note? This cannot be undone',
						icon: 'info',
						showCancelButton: true,
						cancelButtonColor: '#3085d6',
						confirmButtonColor: '#d33',
						confirmButtonText: 'Delete'
					})
					if (result.value) {
						await this.deleteNote(this.note['.key'])
						window.Fire.$emit('NoteDeleted', this.note)
						new window.Toast({ icon: 'success', title: 'Note deleted successfully' })
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			}
		},
		filters: {
			getDateOrTime(date){
				date = new Date(date.seconds * 1000)
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return `at ${date.toTimeString().slice(0,5)}`
				}else if(date > yesterday){
					return `Yesterday`
				}else{
					return `on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		},
	}
</script>
