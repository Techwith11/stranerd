<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select Session Length</h4>
			<a @click.prevent="cancelSessionAndCloseModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small text-center my-4">Please the select the length in hours you would like for the session</p>
		<div class="mx-2">
			<button class="w-100 my-2 rounded" @click="requestSession(0.25)" :disabled="isLoading"
				:class="{'bg-info text-white': isLoading && mode === 0.25}">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 0.25"></i>
				<span>15 minutes - &dollar;10</span>
			</button>
			<button class="w-100 my-2 rounded" @click="requestSession(0.5)" :disabled="isLoading"
				:class="{'bg-info text-white': isLoading && mode === 0.5}">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 0.5"></i>
				<span>30 minutes - &dollar;15</span>
			</button>
			<button class="w-100 my-2 rounded" @click="requestSession(1.0)" :disabled="isLoading"
				:class="{'bg-info text-white': isLoading && mode === 1.0}">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 1.0"></i>
				<span>1.0 hours - &dollar;30</span>
			</button>
			<button class="w-100 my-2 rounded" @click="requestSession(2.0)" :disabled="isLoading"
				:class="{'bg-info text-white': isLoading && mode === 2.0}">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 2.0"></i>
				<span>2.0 hours - &dollar;60</span>
			</button>
			<button class="w-100 my-2 rounded" @click="requestSession(3.0)" :disabled="isLoading"
				:class="{'bg-info text-white': isLoading && mode === 3.0}">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 3.0"></i>
				<span>3.0 hours - &dollar;90</span>
			</button>
			<small class="small text-muted">You will be directed to pay if the tutor accepts the session. Note that you can cancel the session at any point before you complete payment.</small>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			mode: null,
			prices: {
				0.25: 10,
				0.5: 15,
				1: 30,
				2: 60,
				3: 90
			},
			isLoading: false
		}),
		computed: {
			...mapGetters(['getNewSessionData'])
		},
		methods: {
			...mapActions(['cancelSessionAndCloseModal','startSession']),
			async requestSession(duration){
				this.isLoading = true
				this.mode = duration
				let price = this.prices[duration]
				try{
					await this.startSession({ duration, price, ...this.getNewSessionData })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			}
		}
	}
</script>