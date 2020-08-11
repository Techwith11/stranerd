<template>
	<div>
		<div id="content" class="d-flex flex-column">
			<app-navbar />
			<div class="d-flex flex-grow-1">
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

<script lang="ts">
	import { computed, defineComponent } from '@vue/composition-api'
	import Navbar from '@/components/app/Navbar.vue'
	import Sidebar from '@/components/app/Sidebar.vue'
	import Footer from '@/components/app/Footer.vue'
	import store from '@/store'
	export default defineComponent({
		components: {
			'app-navbar': Navbar,
			'app-sidebar': Sidebar,
			'app-footer': Footer
		},
		setup(){
			return { isLoggedIn: computed(() => store.getters.isLoggedIn) }
		}
	})
</script>
