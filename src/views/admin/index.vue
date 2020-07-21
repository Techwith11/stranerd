<template>
	<Default>
		<keep-alive v-if="isLoggedIn">
			<router-view :key="$route.fullPath" />
		</keep-alive>
		<router-view v-else />
		<button class="floating-button" @click="setCreateModalOverview"><i class="fas fa-plus"></i></button>
	</Default>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: "Admins",
		methods: mapActions(['setCreateModalOverview']),
		computed: mapGetters(['isLoggedIn']),
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
	}
</script>
