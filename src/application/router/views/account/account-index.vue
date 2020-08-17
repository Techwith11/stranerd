<template>
	<div v-if="isLoggedIn">
		<profile-info />
		<subscription-info />
		<button class="btn-success floating-button" @click="setAccountModalOverview"><i class="fas fa-cog"></i></button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import store from '@/store'
import ProfileInfo from '@/components/account/single/ProfileInfo.vue'
import SubscriptionInfo from '@/components/account/single/SubscriptionInfo.vue'
export default defineComponent({
	components: {
		'profile-info': ProfileInfo,
		'subscription-info': SubscriptionInfo
	},
	setup(){
		return {
			isLoggedIn: computed(() => store.getters.isLoggedIn),
			setAccountModalOverview: () => store.dispatch('setAccountModalOverview')
		}
	},
})
</script>
