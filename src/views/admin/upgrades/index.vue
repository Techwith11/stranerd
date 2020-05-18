<template>
	<div class="container">
		<upgrade-user-to-admin />
		<upgrade-user-to-tutor />
	</div>
</template>

<script>
	import UpgradeUserToAdmin from '@/components/admin/upgrades/UpgradeUserToAdmin'
	import UpgradeUserToTutor from '@/components/admin/upgrades/UpgradeUserToTutor'
	export default {
		name: "Upgrades",
		components: {
			'upgrade-user-to-admin': UpgradeUserToAdmin,
			'upgrade-user-to-tutor': UpgradeUserToTutor,
		}
	}
</script>