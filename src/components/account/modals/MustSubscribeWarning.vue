<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Warning!</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			<p class="lead">You must be subscribed to view this page. </p>
			<div class="d-flex justify-content-end">
				<button class="btn btn-success" @click="setAccountModalMustSubscribeWarning">Continue</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['closeAccountModal','setAccountModalMustSubscribeWarning']),
		}
	}
</script>