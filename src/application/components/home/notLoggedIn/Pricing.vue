<template>
	<div>
		<div class="bg-gold" style="height: 1rem;"></div>
		<div class="container py-8">
			<div class="mb-5 text-center">
				<h2 class="font-weight-bold text-gold-dark mr-1">Our Pricing Plans</h2>
				<p class="small">Stranerd’s Pricing Plans are carefully structured to give you the best deal no matter what your budget is.</p>
				<router-link class="btn btn-gold text-white" to="/pricing-plans">See more details</router-link>
			</div>
			<div class="d-flex flex-sm-row flex-column">
				<div class="price-card shadow-sm bg-gold-light rounded-xl m-1" v-for="plan in plans" :key="plan.id">
					<p class="font-weight-light">{{ plan.title }}</p>
					<p>
						<span class="display-2 price">${{ plan.monthlyPrice }}</span>
						<span>/month</span>
					</p>
					<p class="w-75 small text-center">{{ plan.description }}</p>
					<ul class="list-group">
						<li>
							<i class="fas fa-check-circle text-gold-dark mr-1"></i>
							<span>{{ plan.questions }} questions monthly</span>
						</li>
						<li>
							<i class="fas fa-check-circle text-gold-dark mr-1"></i>
							<span>Unlimited Access</span>
						</li>
						<li>
							<i class="fas fa-check-circle text-gold-dark mr-1"></i>
							<span>24/7 Support</span>
						</li>
						<li>
							<i class="fas fa-check-circle text-gold-dark mr-1"></i>
							<span>Save 16% for ${{ plan.yearlyPrice }}/year</span>
						</li>
					</ul>
					<router-link class="mx-auto small" to="/pricing-plans">See more details...</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSubscriptionPlansList } from '@/usecases/payments/subscription'
export default defineComponent({
	setup(){
		const { loading, plans } = useSubscriptionPlansList()
		return { loading, plans }
	}
})
</script>

<style lang="scss" scoped>
	.price-card{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0;
	}
	h2{
		font-size: 2.0rem;
	}
	li{
		list-style: none;
		font-size: 0.75rem;
		margin: 0.25rem 0;
	}
	.price{
		color: $primary-dark;
		font-size: 2.5rem;
	}
	@media (max-width: $md){
		#background{
			text-align: center;
		}
		h2{
			font-size: 1.5rem;
		}
		ul{
			text-align: left;
		}
	}
</style>
