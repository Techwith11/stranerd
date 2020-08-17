<template>
	<div class="modal-background">
		<div class="modal-inner">
			<profile-overview v-if="isAccountModalOverview" />
			<edit-profile v-if="isAccountModalEditProfile" />
			<update-password v-if="isAccountModalUpdatePassword" />
			<add-payment-method v-if="isAccountModalAddPaymentMethod" />
			<select-subscription v-if="isAccountModalSelectSubscription" />
			<must-subscribe-warning v-if="isAccountModalMustSubscribeWarning" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileOverview from '@/components/account/modals/ProfileOverview'
import EditProfile from '@/components/account/modals/EditProfile'
import UpdatePassword from '@/components/account/modals/UpdatePassword'
import AddPaymentMethod from '@/components/account/modals/AddPaymentMethod'
import SelectSubscription from '@/components/account/modals/SelectSubscription'
import MustSubscribeWarning from '@/components/account/modals/MustSubscribeWarning'
export default {
	components: {
		'profile-overview': ProfileOverview,
		'edit-profile': EditProfile,
		'update-password': UpdatePassword,
		'add-payment-method': AddPaymentMethod,
		'select-subscription': SelectSubscription,
		'must-subscribe-warning': MustSubscribeWarning
	},
	computed: mapGetters(['isAccountModalOverview','isAccountModalEditProfile','isAccountModalUpdatePassword','isAccountModalAddPaymentMethod','isAccountModalSelectSubscription','isAccountModalMustSubscribeWarning'])
}
</script>