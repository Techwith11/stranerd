<template>
	<div class="m-md-5" id="waiting">
		<i class="fas fa-spinner fa-spin fa-2x"></i>
		<p class="my-3">Waiting for tutor</p>
		<button class="bg-danger text-white shadow-none w-100 my-2 rounded" @click="cancelSessionAndCloseModal">
			Cancel Session
		</button>
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