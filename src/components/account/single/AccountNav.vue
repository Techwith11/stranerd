<template>
	<ul class="bg-dark nav small mb-4 scrolling-nav p-0">
		<li class="nav-item text-center">
			<router-link class="nav-link" to="/account">Profile</router-link>
		</li>
		<li class="nav-item text-center" v-if="isTutor">
			<router-link class="nav-link" to="/account/tests">Tests</router-link>
		</li>
		<li class="nav-item text-center">
			<router-link class="nav-link" to="/account/paymentMethods">Payment Methods</router-link>
		</li>
		<li class="nav-item text-center">
			<router-link class="nav-link" to="/account/transactions">Transactions</router-link>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	@import '../../../style/index';
	.router-link-exact-active{
		border-top: 1px solid $text-black;
		border-left: 1px solid $text-black;
		border-right: 1px solid $text-black;
		border-radius: 10px 10px 0 0;
		background: #fff;
	}
	.nav-link{
		color: #aaa !important;
	}
</style>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: mapGetters(['isTutor'])
	}
</script>