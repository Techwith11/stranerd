<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-end my-3">
			<a @click.prevent="closePostModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			<p>
				<span>You have {{ questionsLeft }} free questions left in your subscription. Note that this will reset to the default number of questions allocated for whatever subscription you are on, whenever it renews</span>
				<span v-if="!questionsLeft && isSubscribed">Consider purchasing extra questions from the shop</span>
				<span v-if="!questionsLeft && !isSubscribed">Consider upgrading to a paid subscription to ask more</span>
			</p>
			<div class="d-flex justify-content-between">
				<button class="bg-info white-button text-white" @click="closePostModal">Close</button>
				<button class="accent-button" @click="setPostModalCreate" v-if="questionsLeft">Continue</button>
				<button class="accent-button" @click="buyMoreFromShop" v-if="!questionsLeft && isSubscribed">Buy more</button>
				<button class="accent-button" @click="upgradeAccount" v-if="!questionsLeft && !isSubscribed">Upgrade</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: {
			...mapActions(['setPostModalCreate','closePostModal']),
			upgradeAccount(){
				//TODO: Work on upgrade account modal
				console.log('Bring up upgrade account modal')
			},
			buyMoreFromShop(){
				//TODO: Work on buy questions from shop modal
				//TODO: Remind user that questions reset at the end of the subscription
				console.log('Bring up buy questions from shop modal')
			}
		},
		computed: mapGetters(['isLoggedIn','isSubscribed','questionsLeft'])
	}
</script>