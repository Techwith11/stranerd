<template>
	<div class="my-3 alert alert-secondary">
		<div class="d-flex justify-content-between align-items-center my-3 cursor-pointer" @click.prevent="toggleCollapse">
			<h4 class="text-capitalize">{{ subject.name }}</h4>
			<span><i class="fas" :class="show ? 'fa-angle-up' : 'fa-angle-down'"></i></span>
		</div>
		<div class="collapse" :id="subject.id">
			<ul class="list-group">
				<li class="list-group-item my-1 d-flex justify-content-between align-items-center" v-for="module in subject.modules" :key="module.name">
					<h6 class="mb-0 text-capitalize">{{ module.name }}</h6>
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

<script lang="ts">
	import { defineComponent, ref } from '@vue/composition-api'
	import { mapActions } from 'vuex'
	import store from '@/store'
	export default defineComponent({
		props: {
			subject: {
				required: true,
				type: Object
			}
		},
		setup(props){
			const show = ref(false)
			const toggleCollapse = () => {
				document.getElementById(props.subject.id)!.classList.toggle('show')
				show.value = !show.value
			}
			const openCreateModal = () => {
				store.dispatch('setEditMeta',props.subject)
				store.dispatch('setCreateModalSubjectModule')
			}
			const openSubjectEditModal = () => {
				store.dispatch('setEditMeta', props.subject)
				store.dispatch('setEditModalSubject')
			}
			const openModuleEditModal = (module: any) => {
				store.dispatch('setEditMeta', { subject: props.subject, module })
				store.dispatch('setEditModalSubject')
			}
			return {
				show, toggleCollapse,
				openCreateModal, openSubjectEditModal, openModuleEditModal,
			}
		},
		methods: {
			...mapActions(['deleteSubject','deleteModule']),
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
						title: `Delete ${module.name}`,
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
	})
</script>

<style lang="scss" scoped>
	#main{
		i{
			font-size: 1.5rem;
		}
	}
</style>
