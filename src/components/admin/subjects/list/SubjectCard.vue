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
						<a @click.prevent="openModuleEditModal(module)"><i class="fas fa-pen mr-3 text-warning"></i></a>
						<a @click.prevent="removeModule(module)"><i class="fas fa-trash text-danger"></i></a>
					</div>
				</li>
			</ul>
			<div class="d-flex my-2 justify-content-end align-items-center" id="main">
				<a @click.prevent="openCreateModal"><i class="fas fa-plus text-success mr-3"></i></a>
				<a @click.prevent="openSubjectEditModal"><i class="fas fa-pen text-warning mr-3"></i></a>
				<a @click.prevent="removeSubject"><i class="fas fa-trash text-danger mr-3"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
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
			...mapActions(['setEditMeta','setEditModalSubjectModule','setCreateModalSubjectModule','setEditModalSubject','deleteSubject','deleteModule']),
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
			openSubjectEditModal(){
				this.setEditMeta(this.subject)
				this.setEditModalSubject()
			},
			openModuleEditModal(module){
				this.setEditMeta({ subject: this.subject, module })
				this.setEditModalSubjectModule()
			},
			async removeSubject(){
				try{
					let result = await new window.SweetAlert({
						title: `Delete ${this.subject.name}`,
						text: 'Are you sure you want to delete this subject',
						icon: 'info',
						showCancelButton: true,
						confirmButtonColor: '#d33',
						cancelButtonColor: '#3085d6',
						confirmButtonText: 'Delete'
					})
					if (result.value) {
						await this.deleteSubject(this.subject['.key'])
						new window.Toast({icon: 'success', title: 'Subject deleted successfully'})
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			},
			async removeModule(module){
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
						await this.deleteModule({ subject: this.subject, module })
						new window.Toast({icon: 'success', title: 'Module deleted successfully'})
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			}
		}
	}
</script>

<style lang="scss" scoped>
	#main{
		i{
			font-size: 1.5rem;
		}
	}
</style>