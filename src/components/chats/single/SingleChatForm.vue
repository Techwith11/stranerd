<template>
	<div class="my-3 d-flex align-items-center">
		<textarea rows="1" class="form-control" placeholder="Enter message" v-model.trim="$v.message.$model"></textarea>
		<i class="fas fa-paper-plane ml-3 text-success" v-if="!$v.$invalid" @click="sendMessage"></i>
		<i class="fas fa-upload ml-3 text-success" v-else @click="$refs.mediaInput.click()"></i>
		<input type="file" multiple @change="captureFiles" class="d-none" ref="mediaInput">
	</div>
</template>

<script>
	import { functions, storage } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			message: '',
			media: [],
			sendChat: functions.httpsCallable('sendChat')
		}),
		validations: {
			message: { required }
		},
		computed: {
			...mapGetters(['getId']),
			getChatPath(){ return [this.getId, this.$route.params.id].sort().join('_') }
		},
		methods:{
			async sendMessage(){
				let message = this.message
				this.message = ''
				this.$v.$reset()
				this.sendChat({ to: this.$route.params.id, content: message, from: this.getId })
					.catch(error => new window.Toast({ icon: 'error', title: error.message }))
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
				}).then(result => {
					if (result.value) {
						this.media.forEach(async file => {
							let link = `chats/singles/${this.getChatPath}/${Date.now()}_${file.name}`
							let chat = { to: this.$route.params.id, from: this.getId }
							if(window.location.hostname === 'localhost'){
								chat.media = { name: file.name, type: file.type, link: `/${link}` }
							}else{
								await storage.ref(link).put(this.video)
								link = await storage.ref(link).getDownloadURL()
								chat.media = { name: file.name, link, type: file.type }
							}
							this.sendChat(chat)
								.catch(error => new window.Toast({ icon: 'error', title: error.message }))
						})
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