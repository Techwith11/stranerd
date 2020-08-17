<template>
	<div class="modal-background">
		<div class="modal-inner">
			<cart-overview v-if="isCartModalOverview" />
			<select-payment v-if="isCartModalSelectPayment" />
			<email-confirmation v-if="isCartModalEmailConfirmation" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartOverview from '@/components/shop/modals/CartOverview'
import SelectPayment from '@/components/shop/modals/SelectPayment'
import EmailConfirmation from '@/components/shop/modals/EmailConfirmation'
export default {
	components: {
		'cart-overview': CartOverview,
		'select-payment': SelectPayment,
		'email-confirmation': EmailConfirmation,
	},
	computed: mapGetters(['isCartModalOverview','isCartModalSelectPayment','isCartModalEmailConfirmation'])
}
</script>