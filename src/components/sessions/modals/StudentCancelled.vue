<template>
	<div class="m-md-5" id="waiting">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<i></i>
			<i class="fas fa-times" @click="cancelSessionAndCloseModal"></i>
		</div>
		<p class="my-3 lead text-danger">Tutor declined</p>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['cancelSessionAndCloseModal'])
		}
	}
</script>