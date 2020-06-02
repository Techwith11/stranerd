<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Profile Settings</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="d-flex flex-column">
			<button class="btn btn-warning text-white" @click="setAccountModalEditProfile">Edit Profile</button>
			<button class="btn btn-warning text-white" @click="setAccountModalUpdatePassword">Update Password</button>
			<button class="btn btn-success" @click="setAccountModalSelectSubscription">{{ isSubscribed ? 'Change subscription' : 'Subscribe now' }}</button>
			<button class="btn btn-danger" @click="cancelSub" v-if="isSubscribed">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				Cancel subscription
			</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data: () => ({
			isLoading: false
		}),
		methods: {
			...mapActions(['closeAccountModal','setAccountModalEditProfile','setAccountModalUpdatePassword','setAccountModalSelectSubscription','cancelSubscription']),
			async cancelSub(){
				let result = await new window.SweetAlert({
					title: 'Cancel Subscription',
					text: 'Are you sure you want to cancel your subscription',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No'
				})
				if (result.value) {
					try{
						this.isLoading = true
						let res = await this.cancelSubscription()
						if(res){
							new window.Toast({ icon: 'success', title: 'Subscription cancelled successfully' })
							this.closeAccountModal()
						}
					}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
					this.isLoading = false
				}
			}
		},
		computed: mapGetters(['isSubscribed'])
	}
</script>