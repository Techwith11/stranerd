<template>
	<div class="container">
		<template v-if="isLoggedIn">
			<profile-info />
			<payment-info />
			<tutor-info />
			<button class="btn-success floating-button" @click="setAccountModalOverview"><i class="fas fa-cog"></i></button>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProfileInfo from '@/components/account/single/ProfileInfo.vue'
import TutorInfo from '@/components/account/single/TutorInfo.vue'
import PaymentInfo from '@/components/account/single/PaymentInfo.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	components: {
		'profile-info': ProfileInfo,
		'tutor-info': TutorInfo,
		'payment-info': PaymentInfo
	},
	setup(){
		return {
			isLoggedIn: useStore().auth.isLoggedIn,
			setAccountModalOverview: useStore().modals.setAccountModalOverview
		}
	},
})
</script>
