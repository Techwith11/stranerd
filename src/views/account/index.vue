<template>
	<div class="container py-3">
		<account-nav />
		<router-view />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AccountNav from '@/components/account/single/AccountNav'
	export default {
		name: 'Account',
		computed: mapGetters(['getUser']),
		components: {
			'account-nav': AccountNav
		},
		meta(){
			return {
				title: `${this.getUser.bio ? this.getUser.bio.name : 'User'} Profile`,
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>