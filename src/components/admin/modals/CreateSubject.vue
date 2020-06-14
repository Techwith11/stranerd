<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4>Add Subject</h4>
			<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input class="form-control" placeholder="Module name" v-model.trim="subject.name">
			</div>
			<div class="form-group my-3">
				<input type="text" class="form-control" placeholder="Modules" v-model.trim="module" @keyup.188="splitModule">
				<div class="small mt-1" v-if="subject.modules.length > 0">
					<span v-for="module in subject.modules" :key="module">
						{{ module }}
						<a @click.prevent="removeModule(module)"><i class="fas fa-times text-danger mr-1"></i></a>
					</span>
				</div>
				<small class="small text-muted" v-else>Use comma separated module names to create modules immediately.</small>
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-success" @click.prevent="submit" :disabled="!subject.name">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Add subject</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'CreateSubject',
		data: () => ({
			subject: {
				name: '',
				modules: []
			},
			module: '',
			isLoading: false
		}),
		methods:{
			...mapActions(['closeCreateModal','createSubject']),
			splitModule(){
				let module = this.module.trim().split(',')[0]
				module = module[0].toUpperCase() + module.slice(1).toLowerCase()
				this.module = ''
				module && !this.subject.modules.includes(module) ? this.subject.modules.push(module) : null
			},
			removeModule(module){ this.subject.modules = this.subject.modules.filter(item => module !== item) },
			async submit() {
				this.isLoading = true
				try{
					await this.createSubject({ ...this.subject })
					this.closeCreateModal()
					new window.Toast({ icon: 'success', title: 'Subject added successfully' })
					this.subject.name = ''
					this.subject.modules = []
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		}
	}
</script>