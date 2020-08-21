<template>
	<Default>
		<div id="background">
			<div class="p-3">
				<account-nav />
				<router-view />
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AccountNav from '@/components/account/single/AccountNav.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	name: 'Account',
	components: {
		'account-nav': AccountNav
	},
	setup(){
		return { getUser: useStore().auth.getUser }
	},
	meta(){
		return {
			title: `${(this.getUser as any).bio?.name ?? 'User'} Profile`,
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

<style lang="scss" scoped>
	#background{ background: $primary-light; min-height: 100vh; }
</style>
