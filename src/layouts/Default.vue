<template>
	<div>
		<div id="content" class="d-flex flex-column">
			<app-navbar />
			<div class="d-flex flex-grow-1">
				<app-sidebar v-if="isLoggedIn" class="d-none d-lg-block" />
				<div class="flex-grow-1" :class="{'px-md-3 py-3': isLoggedIn}">
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
	import Navbar from '@/components/app/Navbar'
	import Sidebar from '@/components/app/Sidebar'
	import Footer from '@/components/app/Footer'
	export default {
		components: {
			'app-navbar': Navbar,
			'app-sidebar': Sidebar,
			'app-footer': Footer
		},
		computed: {
			...mapGetters(['isLoggedIn'])
		}
	}
</script>
