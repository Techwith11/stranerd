<template>
	<div class="my-3 py-4 shadow-sm white">
		<div class="d-flex flex-column align-items-center">
			<div class="d-flex w-100 px-4 align-items-center justify-content-between">
				<a>
					<i class="fas fa-angle-left fa-4x text-black-50" @click="decrement" v-if="index > 0"></i>
				</a>
				<div class="d-inline-block text-center alert mb-3" :class="`alert-${colors[index]}`" v-if="plan">
					<h5 class="text-capitalize mb-4">{{ plan.title }}</h5>
					<h1>&dollar;{{ plan.monthlyPrice }}</h1>
					<p>month</p>
				</div>
				<a>
					<i class="fas fa-angle-right fa-4x text-black-50" @click="increment" v-if="index < getPlans.length -1"></i>
				</a>
			</div>
			<router-link class="mt-3 btn btn-warning text-white" to="/pricing-plans">See plans</router-link>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data: () => ({
			index: 0,
			colors: ['danger','info','success']
		}),
		computed: {
			...mapGetters(['getPlans']),
			plan(){ return this.getPlans[this.index]}
		},
		methods: {
			increment(){
				if(this.index < this.getPlans.length -1){
					this.index++
				}
			},
			decrement(){
				if(this.index > 0){
					this.index--
				}
			}
		}
	}
</script>
