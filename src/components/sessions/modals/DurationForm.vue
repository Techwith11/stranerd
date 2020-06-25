<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select Session Length</h4>
			<a @click.prevent="cancelSessionAndCloseModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small text-center my-4">Please the select the length in hours you would like for the session</p>
		<div class="mx-2">
			<button class="w-100 my-2 rounded" @click="setMode(0.25)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === 0.25}">
				<span>15 minutes - &dollar;7.5</span>
			</button>
			<button class="w-100 my-2 rounded" @click="setMode(0.5)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === 0.5}">
				<span>30 minutes - &dollar;15</span>
			</button>
			<button class="w-100 my-2 rounded" @click="setMode(1.0)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === 1.0}">
				<span>1.0 hours - &dollar;30</span>
			</button>
			<button class="w-100 my-2 rounded" @click="setMode(2.0)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === 2.0}">
				<span>2.0 hours - &dollar;60</span>
			</button>
			<button class="w-100 my-2 rounded" @click="setMode(3.0)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === 3.0}">
				<span>3.0 hours - &dollar;90</span>
			</button>
			<div class="custom-control custom-checkbox my-3">
				<input type="checkbox" id="secret" v-model="secret" class="custom-control-input">
				<label class="custom-control-label" for="secret">Make session conversation private?</label>
				<span class="small">Unchecking this button allows us access to post questions discussed within the session. Most students prefer to keep this checked to avoid plagiarism.</span>
			</div>
			<button class="w-100 my-2 rounded" @click="requestSession" :disabled="isLoading"
				:class="mode ? 'btn-success text-white' : 'btn-secondary'">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading"></i>
				<span>Start session</span>
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
			secret: true,
			prices: {
				0.25: 7.5,
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
			setMode(duration){ this.mode = duration },
			async requestSession(){
				this.isLoading = true
				let duration = this.mode
				let price = this.prices[duration]
				try{
					await this.startSession({ duration, price, secret: this.secret, ...this.getNewSessionData })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		}
	}
</script>