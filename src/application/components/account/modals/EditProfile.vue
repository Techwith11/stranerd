<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Edit Profile</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form @submit.prevent="updateProfile">
			<div class="form-group my-3 d-flex flex-column align-items-center">
				<img :src="imageLink" alt="" v-if="imageLink" class="profile-image" id="userImage">
				<input type="file" @change="catchImage" class="d-none" ref="image" accept="image/*">
				<a @click.prevent="() => { $refs.image.value= ''; $refs.image.click() }">
					<span class="text-info">Upload Profile Image</span>
				</a>
			</div>
			<div class="form-group my-3">
				<input type="text" class="form-control" placeholder="Your full name" v-model="factory.name"
				       :class="{'is-invalid': factory.errors.name,'is-valid': factory.isValid('name') }">
				<small class="small text-danger d-block" v-if="factory.errors.name">{{ factory.errors.name }}</small>
			</div>
			<div class="form-group my-3">
			<textarea class="form-control" placeholder="Tell us a little about yourself" v-model="factory.bio"
			          :class="{'is-invalid': factory.errors.bio,'is-valid': factory.isValid('bio') }" rows="5">
			</textarea>
				<small class="small text-danger d-block" v-if="factory.errors.bio">{{ factory.errors.bio }}</small>
			</div>
			<div class="d-flex justify-content-end">
				<button class="btn-success" :disabled="loading || !factory.valid" type="submit">
					<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
					<span>Update</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useUpdateProfileForm } from '@application/usecases/users/auth'
import { useStore } from '@application/usecases/store'
import { useFileInputs } from '@application/usecases/core/forms'
export default defineComponent({
	setup(){
		const link = useStore().auth.getUser.value?.bio?.image?.link ?? useStore().auth.getDefaultImage.value
		const imageLink = ref(link)
		const { loading, factory, updateProfile } = useUpdateProfileForm()
		const { catchFiles: catchImage } = useFileInputs((file) => {
			factory.image = file
			imageLink.value = window.URL.createObjectURL(file)
		})

		return {
			loading, factory, updateProfile, catchImage, imageLink,
			closeAccountModal: useStore().modals.closeAccountModal
		}
	},
})
</script>

<style lang="scss" scoped>
	img#userImage{
		width: 150px;
		height: 150px;
		margin-bottom: 0.5rem;
	}
</style>
