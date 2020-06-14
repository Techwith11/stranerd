<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4>Edit {{ module }}</h4>
			<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input class="form-control" placeholder="Module name" v-model.trim="name">
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-success" @click.prevent="submit" :disabled="!name">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Save module</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'EditSubjectModule',
		data: () => ({
			module: '',
			name: '',
			subject: {},
			isLoading: false
		}),
		methods:{
			...mapActions(['closeEditModal','clearEditMeta']),
			async submit() {
				this.isLoading = true
				try{
					let modules = this.subject.modules
					let index = modules.findIndex(x => x === this.module)
					let name = this.name
					modules[index] = name[0].toUpperCase() + name.slice(1).toLowerCase()
					await firestore.collection('subjects').doc(this.subject['.key']).update('modules',modules)
					this.name = ''
					this.closeEditModal()
					window.Fire.$emit('SubjectEdited',{ ...this.subject, modules })
					new window.Toast({ icon: 'success', title: 'Module edited successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		computed: mapGetters(['getEditMeta']),
		async mounted(){
			this.subject = this.getEditMeta.subject
			this.module = this.name = this.getEditMeta.module
			this.clearEditMeta()
		}
	}
</script>