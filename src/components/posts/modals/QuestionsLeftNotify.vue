<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Questions Left</h4>
			<a @click.prevent="closePostModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			<p>
				<span>You have {{ questionsLeft }} questions left in your subscription. Note that this will reset to the default number of questions allocated for whatever subscription you are on, whenever it renews. </span>
				<span v-if="!questionsLeft && isSubscribed">Consider purchasing extra questions from the shop</span>
				<span v-if="!questionsLeft && !isSubscribed">Consider upgrading to a paid subscription to ask more</span>
			</p>
			<div class="d-flex justify-content-end">
				<button class="btn-success" @click="setPostModalCreate" v-if="questionsLeft">Continue</button>
				<button class="btn-success" @click="setPostModalBuyMore" v-if="!questionsLeft && isSubscribed">Buy more</button>
				<button class="btn-success" @click="setAccountModalSelectSubscription" v-if="!questionsLeft && !isSubscribed">Upgrade</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: mapActions(['setPostModalBuyMore','setPostModalCreate','closePostModal','setAccountModalSelectSubscription']),
		computed: mapGetters(['isLoggedIn','isSubscribed','questionsLeft'])
	}
</script>