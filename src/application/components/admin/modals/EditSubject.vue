<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4>Edit subject</h4>
			<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input class="form-control" placeholder="Module name" v-model.trim="name">
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-success" @click.prevent="submit" :disabled="!name">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Save subject</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions, mapGetters} from 'vuex'
	export default {
		name: 'CreateSubject',
		data: () => ({
			subject: {
				name: '',
				modules: []
			},
			name: '',
			isLoading: false
		}),
		computed: mapGetters(['getEditMeta']),
		methods:{
			...mapActions(['closeEditModal','clearEditMeta','editSubject']),
			async submit() {
				this.isLoading = true
				try{
					await this.editSubject({ ...this.subject, name: this.name.toLowerCase() })
					this.closeEditModal()
					new window.Toast({ icon: 'success', title: 'Subject edited successfully' })
					this.name = ''
					this.subject.name = ''
					this.subject.modules = []
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		mounted(){
			this.subject = { ...this.getEditMeta }
			this.name = this.subject && this.subject.name
			this.clearEditMeta()
		}
	}
</script>