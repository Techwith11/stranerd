<template>
	<div class="mt-auto mb-3 d-flex flex-column align-items-end">
		<vue-editor class="rounded border w-100" v-model.trim="$v.body.$model" useCustomImageHandler @image-added="handleImageAdded"
			placeholder="Leave a reply"
		/>
		<button @click.prevent="sendReply" class="mt-3" :class="$v.$invalid ? 'bg-gray' : 'accent-button'" :disabled="isLoading || $v.$invalid">
			<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
			<span>Submit</span>
		</button>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			body: '',
			isLoading: false
		}),
		validations: {
			body: { required }
		},
		methods:{
            ...mapActions(['uploadFromEditor','sendPostReply']),
			async handleImageAdded(file, editor, cursorLocation, resetUploader) {
				this.isLoading = true
				try{
					await this.uploadFromEditor({
						file, editor, cursorLocation, resetUploader,
						path: `editor/posts/${this.$route.params.id}/replies/body`
					})
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
			async sendReply(){
				if(this.$v.$invalid){ return }
				let body = this.body
				this.body = ''
				this.$v.$reset()
				try{
					await this.sendPostReply({ body, id: this.$route.params.id })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message })}
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