<template>
	<Default>
		<router-view />
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@/usecases/store'
export default defineComponent({
	name: 'Account',
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
