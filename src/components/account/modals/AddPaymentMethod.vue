<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Add Payment Method</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<add-payment-method  :onAddMethodSuccessful="onAddMethodSuccessful"/>
	</div>
</template>

<script>
	import AddPaymentMethod from '@/components/helpers/AddPaymentMethod'
	import { mapActions } from 'vuex'
	export default {
		components: {
			'add-payment-method': AddPaymentMethod
		},
		methods: {
			...mapActions(['closeAccountModal']),
			onAddMethodSuccessful(){
				new window.Toast({ icon: 'success', title: 'Refresh to see payment method details' })
			}
		}
	}
</script>