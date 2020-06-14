<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4>Add module</h4>
			<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input class="form-control" placeholder="Module name" v-model.trim="name">
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-success" @click.prevent="submit" :disabled="!name">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Add module</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'CreateSubjectModule',
		data: () => ({
			name: '',
			subject: {},
			isLoading: false
		}),
		methods:{
			...mapActions(['closeCreateModal','clearEditMeta','createModule']),
			async submit() {
				this.isLoading = true
				try{
					let name = this.name
					name = name[0].toUpperCase() + name.slice(1).toLowerCase()
					await this.createModule({ subject: this.subject, module: name })
					this.closeCreateModal()
					new window.Toast({ icon: 'success', title: 'Module created successfully' })
					this.name = ''
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		computed: mapGetters(['getEditMeta']),
		async mounted(){
			this.subject = this.getEditMeta
			this.clearEditMeta()
		}
	}
</script>