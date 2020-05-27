<template>
	<ul class="bg-dark nav small justify-content-between mb-5">
		<li class="nav-item flex-grow-1 text-center">
			<router-link class="nav-link" to="/account">Profile</router-link>
		</li>
		<li class="nav-item flex-grow-1 text-center">
			<router-link class="nav-link" to="/account?tab=paymentMethods">Payment Methods</router-link>
		</li>
		<li class="nav-item flex-grow-1 text-center">
			<router-link class="nav-link" to="/account?tab=transactions">Transactions</router-link>
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
	a{
		color: white;
	}
</style>