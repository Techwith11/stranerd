<template>
	<div class="container">
		<h3>My account</h3>
		<p>{{ getUser }}</p>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'MyAccount',
		computed: {
			...mapGetters(['getUser'])
		}
	}
</script>