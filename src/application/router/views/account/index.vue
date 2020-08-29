<template>
	<Default>
		<div class="container py-3">
			<template v-if="isLoggedIn">
				<profile-info />
				<payment-info />
				<tutor-info />
			</template>
		</div>
	</Default>
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
			isLoggedIn: useStore().auth.isLoggedIn
		}
	},
})
</script>
