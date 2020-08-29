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

<script>
import { mapGetters } from 'vuex'
import EditProfile from '@/components/account/modals/EditProfile'
import UpdatePassword from '@/components/account/modals/UpdatePassword'
import AddPaymentMethod from '@/components/account/modals/AddPaymentMethod'
import Transactions from '@/components/account/modals/Transactions'
export default {
	components: {
		'edit-profile': EditProfile,
		'update-password': UpdatePassword,
		'add-payment-method': AddPaymentMethod,
		'transactions': Transactions,
	},
	computed: mapGetters([
	    'isAccountModalEditProfile', 'isAccountModalTransactions',
		'isAccountModalUpdatePassword','isAccountModalAddPaymentMethod'
	])
}
</script>
