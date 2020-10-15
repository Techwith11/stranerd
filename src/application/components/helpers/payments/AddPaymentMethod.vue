<template>
	<div>
		<page-loading v-if="loading"/>
		<form>
			<div class="form-group">
				<label>Credit Card Number</label>
				<div id="creditCardNumber" class="form-control"></div>
			</div>
			<div class="form-group">
				<div class="row">
					<div class="col-6">
						<label>Expire Date</label>
						<div id="expireDate" class="form-control"></div>
					</div>
					<div class="col-6">
						<label>CVV</label>
						<div id="cvv" class="form-control"></div>
					</div>
				</div>
			</div>
			<div class="text-center">
				<button class="btn btn-primary btn-block" :disabled="!isThereAHoistedFieldInstance || createLoading" @click.prevent="addCard">
					<i class="fas fa-spinner fa-spin mr-2" v-if="createLoading"></i>
					<span>Add Credit Card</span>
				</button>
			</div>
			<hr />
			<div class="form-group text-center">
				<div id="paypalButton"></div>
			</div>
			<div class="d-flex mt-3 justify-content-center">
				<img src="../../../assets/images/4_cards.png" alt="" width="200px">
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from '@vue/composition-api'
import { useCreatePaymentMethods, usePaymentForm } from '@application/usecases/payments/paymentForm'
export default defineComponent({
	props: {
		onAddMethodSuccessful: {
			type: Function as PropType<(token: string | undefined) => void>,
			required: true
		}
	},
	setup(props){
		const { loading, isThereAHoistedFieldInstance, initializeHostedFields } = usePaymentForm(props.onAddMethodSuccessful)
		const { loading: createLoading, createPaymentMethod } = useCreatePaymentMethods()
		const addCard = async () => {
			const res = await createPaymentMethod()
			if(res?.success) props.onAddMethodSuccessful(res?.token)
		}
		onMounted(() => initializeHostedFields())
		return { loading, isThereAHoistedFieldInstance, createLoading, addCard }
	}
})
</script>
