<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<a @click.prevent="openCartModal"><i class="fas fa-arrow-left"></i></a>
			<h4 class="mb-0">Select Payment Method</h4>
			<i></i>
		</div>
		<p>You are about to pay &dollar;{{ getCartPrice }} for {{ getCartLength }} {{ getCartLength > 1 ? 'items' : 'item' }}.</p>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: {
			...mapActions(['openCartModal'])
		},
		computed: {
			...mapGetters(['getCartPrice','getCartLength'])
		}
	}
</script>