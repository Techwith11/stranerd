<template>
	<div>
		<template v-if="isLoggedIn">
			<profile-info />
			<subscription-info />
			<button class="btn-success floating-button" @click="setAccountModalOverview"><i class="fas fa-cog"></i></button>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProfileInfo from '@/components/account/single/ProfileInfo.vue'
import SubscriptionInfo from '@/components/account/single/SubscriptionInfo.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	components: {
		'profile-info': ProfileInfo,
		'subscription-info': SubscriptionInfo
	},
	setup(){
		return {
			isLoggedIn: useStore().auth.isLoggedIn,
			setAccountModalOverview: useStore().modals.setAccountModalOverview
		}
	},
})
</script>
