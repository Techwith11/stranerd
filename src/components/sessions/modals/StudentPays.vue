<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Pay for Session</h4>
			<i class="fas fa-times text-danger" @click="this.cancelSessionAndCloseModal"></i>
		</div>
		<div class="mx-2">
			Time to pay
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			mode: null,
			isLoading: false
		}),
		computed: {
			...mapGetters(['getNewSessionData'])
		},
		methods: {
			...mapActions(['cancelSessionAndCloseModal']),
		}
	}
</script>