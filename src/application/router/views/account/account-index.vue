<template>
	<div v-if="getUser.bio">
		<profile-info />
		<subscription-info />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import ProfileInfo from '@/components/account/single/ProfileInfo'
	import SubscriptionInfo from '@/components/account/single/SubscriptionInfo'
	export default {
		components: {
			'profile-info': ProfileInfo,
			'subscription-info': SubscriptionInfo
		},
		computed: {
			...mapGetters(['getUser']),
		}
	}
</script>
