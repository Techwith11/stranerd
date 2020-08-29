<template>
	<Default>
		<div class="container-fluid py-3">
			<upgrade-user-to-admin />
			<upgrade-user-to-tutor />
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UpgradeUserToAdmin from '@/components/admin/upgrades/UpgradeUserToAdmin.vue'
import UpgradeUserToTutor from '@/components/admin/upgrades/UpgradeUserToTutor.vue'
export default defineComponent({
	name: 'Upgrades',
	components: {
		'upgrade-user-to-admin': UpgradeUserToAdmin,
		'upgrade-user-to-tutor': UpgradeUserToTutor,
	},
	meta(){
		return {
			title: 'User Upgrades',
			meta: [
				{
					vmid: 'robots',
					name: 'robots',
					content: 'none'
				}
			]
		}
	}
})
</script>
