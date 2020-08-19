<template>
	<div class="alert" role="alert" :class="{'alert-danger': method.expired, 'alert-warning': !method.expired}">
		<div class="d-flex">
			<span>{{ method.cardType }}</span>
			<span class="ml-3">{{ method.maskedNumber }}</span>
		</div>
		<p class="small mb-2">Expires {{ method.expirationDate }}</p>
		<a class="text-info small" @click.prevent="deleteMethod">
			<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
			<span>Delete</span>
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'
import { useDeletePaymentMethod } from '@/usecases/payments/paymentMethods'
export default defineComponent({
	props: {
		method: {
			required: true,
			type: MethodEntity
		}
	},
	setup(props){
		const { loading, deleteMethod } = useDeletePaymentMethod(props.method)
		return { loading, deleteMethod }
	},
})
</script>
