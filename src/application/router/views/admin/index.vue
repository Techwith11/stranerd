<template>
	<div>
		<router-view />
		<button class="floating-button" @click="setCreateModalOverview"><i class="fas fa-plus"></i></button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'Admins',
	setup(){
		return {
			isLoggedIn: useStore().auth.isLoggedIn,
			setCreateModalOverview: useStore().modals.setCreateModalOverview
		}
	},
	meta(){
		return {
			title: 'Stranerd Admin',
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
