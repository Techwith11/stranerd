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
			<div class="form-group my-3">
				<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
				<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
					<span v-if="image">{{image.name}} </span>
					<span class="text-info">Upload image preview</span>
				</a>
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-success" @click.prevent="submit" :disabled="$v.$invalid">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Add module</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateSubjectModule',
		data: () => ({
			name: '',
			image: null,
			subject: {},
			isLoading: false
		}),
		methods:{
			...mapActions(['closeCreateModal','clearEditMeta','createModule']),
			catchImage(e){ e.target.files[0] &&e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not an image'})},
			async submit() {
				this.isLoading = true
				try{
					let name = this.name.toLowerCase()
					await this.createModule({ subject: this.subject, module: { name }, image: this.image })
					this.closeCreateModal()
					new window.Toast({ icon: 'success', title: 'Module created successfully' })
					this.name = ''
					this.image = null
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		computed: mapGetters(['getEditMeta']),
		async mounted(){
			this.subject = this.getEditMeta
			this.clearEditMeta()
		},
		validations: {
			name: { required },
			image: { required }
		}
	}
</script>