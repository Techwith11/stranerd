<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select subscription</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="d-flex flex-column">
			<p>Select sub</p>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['closeAccountModal'])
		}
	}
</script>