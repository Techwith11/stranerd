<template>
	<div class="container">
		<upgrade-user-to-admin />
		<upgrade-user-to-tutor />
	</div>
</template>

<script>
	import UpgradeUserToAdmin from '@/components/admin/UpgradeUserToAdmin'
	import UpgradeUserToTutor from '@/components/admin/UpgradeUserToTutor'
	export default {
		name: "Admins",
		components: {
			'upgrade-user-to-admin': UpgradeUserToAdmin,
			'upgrade-user-to-tutor': UpgradeUserToTutor,
		}
	}
</script>