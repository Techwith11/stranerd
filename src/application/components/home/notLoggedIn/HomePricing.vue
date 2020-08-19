<template>
	<div id="background">
		<div class="container d-flex flex-column flex-md-row justify-content-center align-items-center">
			<div class="mb-5">
				<h2 class="font-weight-bold">Our Pricing Plans</h2>
				<p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
				<router-link class="btn primary-button" to="/pricing-plans">See more details</router-link>
			</div>
			<div class="price-card" v-for="plan in plans" :key="plan.id">
				<p class="font-weight-light">{{ plan.title }}</p>
				<p>
					<span class="display-2 price">${{ plan.monthlyPrice }}</span>
					<span>/month</span>
				</p>
				<p class="price-subtitle w-75">{{ plan.description }}</p>
				<ul>
					<li>
						<i class="fas fa-check-circle"></i>
						<span>{{ plan.questions }} questions monthly</span>
					</li>
					<li>
						<i class="fas fa-check-circle"></i>
						<span>Unlimited Access</span>
					</li>
					<li>
						<i class="fas fa-check-circle"></i>
						<span>24/7 Support</span>
					</li>
					<li>
						<i class="fas fa-check-circle"></i>
						<span>Save 16% for ${{ plan.yearlyPrice }}/year</span>
					</li>
				</ul>
				<router-link class="mx-auto small" to="/pricing-plans">read more...</router-link>
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
	#background{
		background: $primary-light;
		padding: 4rem 0;
		color: $text-black;
	}
	.price-card{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0;
	}
	h2{
		font-size: 2.5rem;
	}
	h2, i{
		color: $primary-dark;
		margin-right: 0.25rem;
	}
	ul{
		padding: 0;
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
	.price-subtitle{
		font-size: 0.65rem;
	}
	@media screen and (max-width: 767px){
		.price-subtitle{
			font-size: 0.90rem;
		}
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
