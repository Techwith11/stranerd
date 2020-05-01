<template>
	<div>
		<div id="content">
			<app-nav-bar />
			<router-view/>
		</div>
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
		computed: mapGetters(['isModalOpen', 'getId']),
		methods: mapActions(['setProfileListener','closeProfileListener']),
		mounted(){ this.setProfileListener() },
		beforeDestroy(){ this.closeProfileListener() },
		watch: {
			getId(){ return this.setProfileListener() }
		}
	}
</script>

<style lang="scss" scoped>
	#content{
		min-height: 95vh;
	}
</style>
