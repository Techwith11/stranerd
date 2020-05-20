<template>
	<div class="mt-auto mb-3 d-flex align-items-center">
		<textarea rows="2" class="form-control" placeholder="Leave a reply" v-model.trim="$v.body.$model"></textarea>
		<a @click.prevent="sendReply" :class="$v.$invalid ? 'text-secondary' : 'text-success'"><i class="fas fa-paper-plane ml-3"></i></a>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			body: ''
		}),
		validations: {
			body: { required }
		},
		methods:{
            ...mapActions(['sendPostReply']),
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