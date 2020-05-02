<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select Session Length</h4>
			<i class="fas fa-times text-danger" @click="cancelSessionAndCloseModal"></i>
		</div>
		<p class="small text-center my-4">Please the select the length in hours you would like for the session</p>
		<div class="mx-2">
			<button class="shadow-none w-100 my-2 rounded" @click="requestSession(0.5)">
				0.5 hours
			</button>
			<button class="shadow-none w-100 my-2 rounded" @click="requestSession(1.0)">
				1.0 hours
			</button>
			<button class="shadow-none w-100 my-2 rounded" @click="requestSession(1.5)">
				1.5 hours
			</button>
			<button class="shadow-none w-100 my-2 rounded" @click="requestSession(2.0)">
				2.0 hours
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed: {
			...mapGetters(['getNewSessionData'])
		},
		methods: {
			...mapActions(['cancelSessionAndCloseModal','startSession']),
			async requestSession(duration){
				await this.startSession({ duration, ...this.getNewSessionData })
			}
		}
	}
</script>