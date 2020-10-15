<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select Session Length</h4>
			<a @click.prevent="cancelSessionAndCloseModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small text-center my-4">Please the select the length in hours you would like for the session</p>
		<div class="mx-2">
			<button class="w-100 my-2 rounded" @click="setMode(time)" :disabled="isLoading"
				:class="{'bg-info text-white': mode === time}" v-for="{time, price} in getPrices" :key="time" >
				<span>{{ time >= 1 ? `${time} hours`: `${time * 60} minutes` }} - &dollar;{{ price }}</span>
			</button>
			<div class="custom-control custom-checkbox my-3">
				<input type="checkbox" id="secret" v-model="secret" class="custom-control-input">
				<label class="custom-control-label" for="secret">Make session conversation private?</label>
				<span class="small">Unchecking this button allows us access to post questions discussed within the session. Most students prefer to keep this checked to avoid cases of plagiarism.</span>
			</div>
			<button class="w-100 my-2 rounded" @click="requestSession" :disabled="isLoading"
				:class="mode ? 'btn-success text-white' : 'btn-secondary'">
				<loading class="mr-2" v-if="isLoading" />
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
		isLoading: false
	}),
	computed: {
		...mapGetters(['getNewSessionData','isSubscribed']),
		prices(){
			const sub = this.isSubscribed
			return {
				0.25: sub ? 7.5 : 10,
				0.5: sub ? 15 : 20,
				1.0: sub ? 30 : 40,
				2.0: sub ? 60 : 80,
				3.0: sub ? 90 : 120
			}
		},
		getPrices(){
			const entries = Object.entries(this.prices)
			entries.sort((a,b) => a[0] - b[0])
			return entries.map((arr) => ({ time: parseFloat(arr[0]), price: arr[1] }))
		}
	},
	methods: {
		...mapActions(['cancelSessionAndCloseModal','startSession']),
		setMode(duration){ this.mode = duration },
		async requestSession(){
			this.isLoading = true
			const duration = this.mode
			const price = this.prices[duration]
			try{
				await this.startSession({ duration, price, secret: this.secret, ...this.getNewSessionData })
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			this.isLoading = false
		}
	}
}
</script>
