<template>
	<div class="mt-auto mb-3 d-flex align-items-center">
		<textarea rows="2" class="form-control" placeholder="Leave a reply" v-model.trim="$v.message.$model"></textarea>
		<a @click.prevent="sendMessage" :class="$v.$invalid ? 'text-secondary' : 'text-success'"><i class="fas fa-paper-plane ml-3"></i></a>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			message: ''
		}),
		validations: {
			message: { required }
		},
		methods:{
            ...mapActions([]),
			async sendMessage(){
				if(this.$v.$invalid){ return }
				let message = this.message
				this.message = ''
				this.$v.$reset()
				console.log(message)
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