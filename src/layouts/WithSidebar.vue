<template>
	<div>
		<div id="content">
			<app-navbar />
			<div class="d-flex">
				<app-sidebar v-if="isLoggedIn" class="d-none d-lg-block" />
				<div class="flex-grow-1">
					<slot></slot>
				</div>
			</div>
		</div>
		<app-footer />
	</div>
</template>

<style lang="scss" scoped>
	#content{
		min-height: 95vh;
	}
</style>

<script>
	import { mapGetters } from 'vuex'
	import NavbarOfSidebar from '@/components/app/NavbarOfSidebar'
	import Sidebar from '@/components/app/Sidebar'
	import Footer from '@/components/app/Footer'
	export default {
		components: {
			'app-navbar': NavbarOfSidebar,
			'app-sidebar': Sidebar,
			'app-footer': Footer
		},
		computed: {
			...mapGetters(['isLoggedIn'])
		}
	}
</script>
