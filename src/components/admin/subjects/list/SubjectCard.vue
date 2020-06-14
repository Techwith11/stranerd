<template>
	<div class="my-3 alert alert-secondary">
		<div class="d-flex justify-content-between align-items-center my-3">
			<h4>{{ subject.name }}</h4>
			<a @click.prevent="hideCollapse" v-if="show"><i class="fas fa-angle-up"></i></a>
			<a @click.prevent="showCollapse" v-else><i class="fas fa-angle-down"></i></a>
		</div>
		<div class="collapse" :id="subject['.key']">
			<ul class="list-group">
				<li class="list-group-item my-1 d-flex justify-content-between align-items-center" v-for="module in subject.modules" :key="module">
					<h6 class="mb-0">{{ module }}</h6>
					<div class="d-flex">
						<i class="fas fa-pen mr-3 text-warning" @click.prevent="openEditModal(module)"></i>
						<i class="fas fa-trash text-danger" @click="deleteModule(module)"></i>
					</div>
				</li>
			</ul>
			<div class="d-flex my-2 justify-content-end">
				<button class="btn-sm px-3 btn-success" @click="openCreateModal">Add New Module</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapActions } from 'vuex'
	export default {
		data: () => ({
			show: false
		}),
		props: {
			subject: {
				required: true,
				type: Object
			}
		},
		methods: {
			...mapActions(['setEditMeta','setEditModalSubjectModule','setCreateModalSubjectModule']),
			showCollapse(){
				document.getElementById(this.subject['.key']).classList.add('show')
				this.show = true
			},
			hideCollapse(){
				document.getElementById(this.subject['.key']).classList.remove('show')
				this.show = false
			},
			openCreateModal(){
				this.setEditMeta(this.subject)
				this.setCreateModalSubjectModule()
			},
			openEditModal(module){
				this.setEditMeta({ subject: this.subject, module })
				this.setEditModalSubjectModule()
			},
			async deleteModule(module){
				try{
					let result = await new window.SweetAlert({
						title: `Delete ${module}`,
						text: 'Are you sure you want to delete this module',
						icon: 'info',
						showCancelButton: true,
						confirmButtonColor: '#d33',
						cancelButtonColor: '#3085d6',
						confirmButtonText: 'Delete'
					})
					if (result.value) {
						let modules = this.subject.modules.filter(m => m !== module)
						await firestore.collection('subjects').doc(this.subject['.key']).update('modules',modules)
						window.Fire.$emit('SubjectEdited',{ ...this.subject, modules })
						new window.Toast({icon: 'success', title: 'Module deleted successfully'})
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			}
		}
	}
</script>