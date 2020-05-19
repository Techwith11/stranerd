<template>
	<div class="mt-auto mb-3 d-flex align-items-center">
		<textarea rows="1" class="form-control" placeholder="Enter message" v-model.trim="$v.message.$model"></textarea>
		<a v-if="!$v.$invalid" @click.prevent="sendMessage"><i class="fas fa-paper-plane ml-3 text-success"></i></a>
		<a v-else @click.prevent="$refs.mediaInput.click()"><i class="fas fa-upload ml-3 text-success"></i></a>
		<input type="file" multiple @change="captureFiles" class="d-none" ref="mediaInput">
	</div>
</template>

<script>
    import { mapActions, mapGetters} from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			message: '',
			media: []
		}),
		validations: {
			message: { required }
		},
		computed: {
			...mapGetters(['getId']),
			getChatPath(){ return [this.getId, this.$route.params.id].sort().join('_') }
		},
		methods:{
			...mapActions(['sendSessionChat','sendSessionMedia']),
			async sendMessage(){
				let message = this.message
				this.message = ''
				this.$v.$reset()
				return this.sendSessionChat({ id: this.$route.params.id, content: message })
					.catch(error => new window.Toast({ icon: 'error', title: error.message }))
			},
			captureFiles(e){
				this.media = [ ...e.target.files ]
				this.uploadFiles()
			},
			async uploadFiles(){
				let result = await new window.SweetAlert({
					title: 'Send Files',
					text: 'Are you sure you want to send these files',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Send'
				})
				if (result.value) {
					for (const file of this.media) {
                        this.sendSessionMedia({ id: this.$route.params.id, media: file })
                            .catch(error => new window.Toast({ icon: 'error', title: error.message }))
					}
				}
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