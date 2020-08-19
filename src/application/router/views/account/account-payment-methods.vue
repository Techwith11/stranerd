<template>
	<div>
		<helper-spinner v-if="loading"/>
		<div v-else>
			<helper-message :message="error" v-if="error" />
			<div v-else>
				<payment-method-card :method="method" v-for="method in methods" :key="method.id"/>
			</div>
			<button class="floating-button" @click="setAccountModalAddPaymentMethod"><i class="fas fa-plus"></i></button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PaymentMethodCard from '@/components/account/single/PaymentMethodCard.vue'
import { usePaymentMethodsList } from '@/usecases/payments/paymentMethods'
import { useStore } from '@/usecases/store'
export default defineComponent({
	setup(){
		const { loading, methods, error } = usePaymentMethodsList()
		return {
			loading, methods, error,
			setAccountModalAddPaymentMethod: useStore().modals.setAccountModalAddPaymentMethod
		}
	},
	components: {
		'payment-method-card': PaymentMethodCard
	}
})
</script>
