<template>
	<div class="my-3 d-flex align-items-center">
		<textarea rows="1" class="form-control" placeholder="Enter message" v-model.trim="$v.message.$model"></textarea>
		<i class="fas fa-paper-plane ml-3 text-success" v-if="!$v.$invalid" @click="sendMessage"></i>
		<i class="fas fa-upload ml-3 text-success" v-else @click="$refs.mediaInput.click()"></i>
		<input type="file" multiple @change="captureFiles" class="d-none" ref="mediaInput">
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			message: '',
			media: []
		}),
		validations: {
			message: { required }
		},
		methods:{
			sendMessage(){
				alert('Message sent')
				this.message = ''
				/* TODO: Create new chat instance */
			},
			captureFiles(e){
				this.media = e.target.files
				this.uploadFiles()
			},
			uploadFiles(){
				new window.SweetAlert({
					title: 'Send Files',
					text: 'Are you sure you want to send these files',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Send'
				}).then((result) => {
					if (result.value) {
						alert('Uploaded')
						// TODO:  Upload files and create new media chat instance for each file
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	i{
		font-size: 1.5rem;
	}
	@media screen and (min-width: 768px){
		i{
			font-size: 1.75rem;
		}
	}
	@media screen and (min-width: 992px){
		i{
			font-size: 2.0rem;
		}
	}
</style>