<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Edit Profile</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="form-group my-3 d-flex flex-column align-items-center">
			<img :src="imageLink" alt=""  v-if="imageLink">
			<input type="file" @change="catchImage" class="d-none" ref="image" accept="image/*">
			<a @click.prevent="() => { $refs.image.value= ''; $refs.image.click() }">
				<span class="text-info">Upload Profile Image</span>
			</a>
		</div>
		<div class="form-group my-3">
			<input type="text" class="form-control" placeholder="Your full name" v-model.trim="$v.bio.name.$model"
				:class="{'is-invalid': $v.bio.name.$error,'is-valid': !$v.bio.name.$invalid}">
			<small class="small text-danger d-block" v-if="$v.bio.name.$error">Name must be at least 3 characters</small>
		</div>
		<div class="form-group my-3">
			<textarea class="form-control" placeholder="Tell us a little about yourself" v-model.trim="$v.bio.bio.$model"
				:class="{'is-invalid': $v.bio.bio.$error,'is-valid': !$v.bio.bio.$invalid}" rows="5">
			</textarea>
			<small class="small text-danger d-block" v-if="$v.bio.bio.$error">Bio must be at least 3 characters</small>
		</div>
		<div class="d-flex justify-content-end">
			<button :class="isLoading || $v.$invalid ? 'btn-secondary opacity-25' : 'btn-success'" :disabled="isLoading || $v.$invalid" @click="update">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Update</span>
			</button>
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data: () => ({
			bio: {
				name: '',
				bio: ''
			},
			image: null,
			imageLink: null,
			isLoading: false
		}),
		computed: {
			...mapGetters(['getUser','getDefaultImage'])
		},
		methods: {
			...mapActions(['closeAccountModal', 'updateProfile']),
			catchImage(e){
				let file = e.target.files[0]
				if(file && file.type.startsWith('image/')){
					this.image = file
					this.imageLink = window.URL.createObjectURL(file)
				}else{ new window.Toast({ icon:'error', title: 'File is not an image'}) }
			},
			async update(){
				this.isLoading = true
				try{
					await this.updateProfile({ bio: this.bio, image: this.image })
					this.closeAccountModal()
					new window.Toast({ icon: 'success', title: 'Profile updated successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		mounted(){
			this.bio.name = this.getUser.bio.name
			this.bio.bio = this.getUser.bio.bio
			if(this.getUser.bio.image && this.getUser.bio.image.link){
				this.imageLink = this.getUser.bio.image.link
			}else{
				this.imageLink = this.getDefaultImage
			}
		},
		validations:{
			bio: {
				name: { required, minLength: minLength(3) },
				bio: { required, minLength: minLength(3) }
			}
		}
	}
</script>

<style lang="scss" scoped>
	img{
		width: 180px;
		margin: 0 0 0.5rem;
	}
</style>
