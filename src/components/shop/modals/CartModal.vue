<template>
	<div class="modal-background">
		<div class="modal-inner">
			<cart-overview v-if="isCartModalOverview" />
			<select-payment v-if="isCartModalSelectPayment" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CartOverview from '@/components/shop/modals/CartOverview'
	import SelectPayment from '@/components/shop/modals/SelectPayment'
	export default {
		components: {
			'cart-overview': CartOverview,
			'select-payment': SelectPayment
		},
		computed: mapGetters(['isCartModalOverview','isCartModalSelectPayment'])
	}
</script>