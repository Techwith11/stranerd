<template>
	<div class="container py-5">
		<div v-if="page === 1">
			<div class="d-flex justify-content-center align-items-center mb-5">
				<span class="mr-2">Monthly</span>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="toggle" v-model="annual">
					<label for="toggle" class="custom-control-label">Annually</label>
				</div>
			</div>
			<div class="row my-3">
				<div class="col-lg-4 mb-5" v-for="(plan,index) in getPlans" :key="plan['.key']">
					<div class="text-center alert mb-3" :class="`alert-${colors[index]}`">
						<h5 class="text-capitalize mb-4">{{ plan.title }}</h5>
						<p v-if="annual">save 16%</p>
						<h1>&dollar;{{ annual ? plan.yearlyPrice : plan.monthlyPrice }}</h1>
						<p>per {{ annual ? 'year' : 'month' }}</p>
					</div>
					<div class="alert" :class="`alert-${colors[index]}`">
						<p class="text-center">{{ plan.description }}</p>
						<hr class="my-4">
						<ul class="small list-group">
							<li class="list-group-item">{{ plan.questions }} questions per month</li>
							<li class="list-group-item">Unlimited access to resources</li>
							<li class="list-group-item">Unlimited tutors</li>
							<li class="list-group-item">24/7 support</li>
						</ul>
					</div>
					<div class="d-flex justify-content-center" v-if="annual">
						<p v-if="isLoggedIn && plan.yearlyId === getCurrentId">Currently on this plan</p>
						<button class="btn btn-success" @click="setId(plan.yearlyId)" v-else>Select</button>
					</div>
					<div class="d-flex justify-content-center" v-else>
						<p v-if="isLoggedIn && plan.monthlyId === getCurrentId">Currently on this plan</p>
						<button class="btn btn-success" @click="setId(plan.monthlyId)" v-else>Select</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h5 class="mb-5 text-center">Select payment method to use to pay for subscription</h5>
			<select-payment-method :onMethodSelected="setToken" :loading="isLoading" />
			<div class="d-flex justify-content-end">
				<button class="btn" :class="token ? 'btn-success' : 'btn-secondary opacity-25'" :disabled="token === null" @click="subscribe">
					<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
					Subscribe
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import SelectPaymentMethod from "@/components/helpers/SelectPaymentMethod"
	export default {
		data: () => ({
			annual: false,
			page: 1,
			isLoading: false,
			id: null,
			token: null,
			colors: ['danger','info','success']
		}),
		computed: {
			...mapGetters(['getPlans','isLoggedIn','isSubscribed','getUser']),
			getCurrentId(){ return this.getUser?.account?.subscription?.planId }
		},
		methods: {
			...mapActions(['setAuthModalLogin','subscribeToPlan']),
			setId(id){
				if(this.isLoggedIn){
					this.id = id
					this.page = 2
					document.getElementsByTagName('body')[0].scrollIntoView()
				}else{
					this.setAuthModalLogin()
					new window.Toast({ icon: 'warning', title: 'Login to continue' })
				}
			},
			setToken(token){ this.token = token },
			async subscribe(){
				this.isLoading = true
				try{
					await this.subscribeToPlan({token: this.token, planId: this.planId })
					await this.$router.push('/')
					new window.Toast({ icon: 'success', title: 'Subscription created successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
			checkId(){
				let id = this.getCurrentId
				this.id = id ? id : null
			}
		},
		components: {
			'select-payment-method': SelectPaymentMethod
		},
		watch: {
			getUser: {
				immediate: true,
				handler(){
					let id = this.getCurrentId
					this.id = id ? id : null
				}
			}
		}
	}
</script>
