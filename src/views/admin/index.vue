<template>
	<div class="container">
		<upgrade-user-to-admin />
	</div>
</template>

<script>
	import UpgradeUserToAdmin from '@/components/admin/UpgradeUserToAdmin'
	export default {
		name: "Admins",
		components: {
			'upgrade-user-to-admin': UpgradeUserToAdmin
		}
	}
</script>