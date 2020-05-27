<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-profile v-if="isAccountModalEditProfile" />
			<update-password v-if="isAccountModalUpdatePassword" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditProfile from '@/components/account/modals/EditProfile'
	import UpdatePassword from '@/components/account/modals/UpdatePassword'
	export default {
		components: {
			'edit-profile': EditProfile,
			'update-password': UpdatePassword
		},
		computed: mapGetters(['isAccountModalEditProfile','isAccountModalUpdatePassword'])
	}
</script>