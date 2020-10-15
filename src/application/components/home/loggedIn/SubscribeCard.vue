<template>
	<div class="my-3 py-4 shadow white">
		<helper-spinner v-if="loading" />
		<div class="d-flex flex-column align-items-center" v-else>
			<div class="d-flex w-100 px-4 align-items-center justify-content-between">
				<a>
					<i class="fas fa-angle-left fa-4x text-dark" @click="decrement" v-if="canDecrement"></i>
				</a>
				<div class="d-inline-block text-center alert mb-3" :class="`alert-${color}`" v-if="plan">
					<h5 class="text-capitalize mb-4">{{ plan.title }}</h5>
					<h1>&dollar;{{ plan.monthlyPrice }}</h1>
					<p>month</p>
				</div>
				<a>
					<i class="fas fa-angle-right fa-4x text-dark" @click="increment" v-if="canIncrement"></i>
				</a>
			</div>
			<router-link class="mt-3 btn btn-warning text-white" to="/pricing-plans">See plans</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { useSubscriptionPlansList } from '@application/usecases/payments/subscription'
export default defineComponent({
	setup(){
		const colors = ['danger','info','success']
		const { loading, plans } = useSubscriptionPlansList()
		const index = ref(0)
		const canIncrement = computed(() => index.value < plans.value.length - 1)
		const canDecrement = computed(() => index.value > 0)
		const increment = () => canIncrement.value ? index.value++ : null
		const decrement = () => canDecrement.value ? index.value-- : null
		return {
			increment, decrement, loading, index,
			plan: computed(() => plans.value[index.value]),
			color: computed(() => colors[index.value]),
			canIncrement, canDecrement
		}
	},
})
</script>
