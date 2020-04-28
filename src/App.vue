<template>
	<div id="app" class="d-flex flex-column">
		<app-nav-bar />
		<router-view/>
		<app-footer />
		<auth-modal v-if="isModalOpen"/>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Navbar from '@/components/app/Navbar'
	import Footer from '@/components/app/Footer'
	import AuthModal from '@/components/auth/AuthModal'
	export default {
		name: 'App',
		components: {
			'app-nav-bar': Navbar,
			'app-footer': Footer,
			'auth-modal': AuthModal,
		},
		computed: mapGetters(['isModalOpen']),
		methods: mapActions(['setListener','closeListener']),
		mounted(){ this.setListener() },
		beforeDestroy(){ this.closeListener() }
	}
</script>

<style>
	#app{
		min-height: 100vh;
	}
</style>
