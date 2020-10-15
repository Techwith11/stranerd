<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-profile v-if="isAccountModalEditProfile" />
			<update-password v-if="isAccountModalUpdatePassword" />
			<add-payment-method v-if="isAccountModalAddPaymentMethod" />
			<transactions v-if="isAccountModalTransactions" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import EditProfile from '@application/components/account/modals/EditProfile.vue'
import UpdatePassword from '@application/components/account/modals/UpdatePassword.vue'
import AddPaymentMethod from '@application/components/account/modals/AddPaymentMethod.vue'
import Transactions from '@application/components/account/modals/Transactions.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'edit-profile': EditProfile,
		'update-password': UpdatePassword,
		'add-payment-method': AddPaymentMethod,
		'transactions': Transactions,
	},
	setup(){
		return {
			isAccountModalEditProfile: useStore().modals.isAccountModalEditProfile,
			isAccountModalTransactions: useStore().modals.isAccountModalTransactions,
			isAccountModalUpdatePassword: useStore().modals.isAccountModalUpdatePassword,
			isAccountModalAddPaymentMethod: useStore().modals.isAccountModalAddPaymentMethod,
		}
	}
})
</script>
