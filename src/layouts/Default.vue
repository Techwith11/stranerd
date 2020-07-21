<template>
	<div>
		<div id="content">
			<app-nav-bar />
			<slot></slot>
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
	import Navbar from '@/components/app/Navbar'
	import Footer from '@/components/app/Footer'
	export default {
		components: {
			'app-nav-bar': Navbar,
			'app-footer': Footer
		}
	}
</script>
