<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Profile Settings</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="d-flex flex-column">
			<button class="btn btn-warning" @click="setAccountModalStateEditProfile">Edit Profile</button>
			<button class="btn btn-warning" @click="setAccountModalStateUpdatePassword">Update Password</button>
			<button class="btn btn-success" @click="setAccountModalStateSelectSubscription">{{ isSubscribed ? 'Change subscription' : 'Subscribe now' }}</button>
			<button class="btn btn-danger" @click="cancelSubscription" v-if="isSubscribed">Cancel subscription</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: mapActions(['closeAccountModal','setAccountModalStateEditProfile','setAccountModalStateUpdatePassword','setAccountModalStateSelectSubscription','cancelSubscription']),
		computed: mapGetters(['isSubscribed'])
	}
</script>