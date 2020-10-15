<template>
	<div class="alert" role="alert" :class="transaction.successful ? 'alert-success' : 'alert-danger'">
		<div class="d-flex">
			<span>&dollar;{{ transaction.amount }}</span>
			<span class="ml-2">{{ transaction.type }}</span>
			<span class="ml-auto">{{ transaction.creditCard.maskedNumber }}</span>
		</div>
		<div class="d-flex justify-content-start small">
			<span>Charged {{ transaction.createdDate }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { TransactionEntity } from '@modules/payments/domain/entities/transaction'
export default defineComponent({
	props: {
		transaction: {
			required: true,
			type: TransactionEntity
		}
	}
})
</script>
