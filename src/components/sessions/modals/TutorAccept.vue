<template>
	<div class="m-md-5">
		<p class="small text-center my-4">Someone is requesting to start a session with you</p>
		<div class="mx-2">
			<button class="bg-success text-white shadow-none w-100 my-2 rounded" @click="acceptSession">
				Accept
			</button>
			<button class="bg-danger text-white shadow-none w-100 my-2 rounded" @click="cancelSessionAndCloseModal">
				Reject
			</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['cancelSessionAndCloseModal', 'acceptSession'])
		}
	}
</script>