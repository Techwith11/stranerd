<template>
	<div class="mt-auto mb-3">
		<editor :model="$v.body.$model" :path='`editor/posts/${$route.params.id}/replies/body`' :onChange="(content) => {this.$v.body.$model = content}"
			:valid="!$v.body.$invalid" :error="$v.body.$error" placeholder="Leave a reply"
		/>
		<div class="d-flex justify-content-end">
			<button @click.prevent="sendReply" class="mt-3" :class="$v.$invalid ? 'bg-gray' : 'btn-success'" :disabled="isLoading || $v.$invalid">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Submit</span>
			</button>
		</div>
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
            ...mapActions(['sendPostReply']),
			async sendReply(){
				this.isLoading = true
				if(this.$v.$invalid){ return }
				let body = this.body
				this.body = ''
				this.$v.$reset()
				try{
					await this.sendPostReply({ body, id: this.$route.params.id })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message })}
				this.isLoading = false
			}
		}
	}
</script>
