<template>
	<div class="modal-background">
		<div class="modal-inner">
			<cart-overview v-if="isCartModalOverview" />
			<select-payment v-if="isCartModalSelectPayment" />
			<email-confirmation v-if="isCartModalEmailConfirmation" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CartOverview from '@application/components/shop/modals/CartOverview.vue'
import SelectPayment from '@application/components/shop/modals/SelectPayment.vue'
import EmailConfirmation from '@application/components/shop/modals/EmailConfirmation.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'cart-overview': CartOverview,
		'select-payment': SelectPayment,
		'email-confirmation': EmailConfirmation,
	},
	setup(){
		return {
			isCartModalOverview: useStore().modals.isCartModalOverview,
			isCartModalSelectPayment: useStore().modals.isCartModalSelectPayment,
			isCartModalEmailConfirmation: useStore().modals.isCartModalEmailConfirmation,
		}
	}
})
</script>
