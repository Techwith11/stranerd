<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-profile v-if="isAccountModalEditProfile" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditProfile from '@/components/account/modals/EditProfile'
	export default {
		components: {
			'edit-profile': EditProfile
		},
		computed: mapGetters(['isAccountModalEditProfile'])
	}
</script>