<template>
	<div class="alert" role="alert" :class="{'alert-danger': method.expired, 'alert-success': !method.expired}">
		<div class="d-flex align-items-center mb-2">
			<img :src="method.image" alt="" width="50" class="mr-2">
			<span class="text-capitalize font-weight-500">{{ method.type }}</span>
			<span class="ml-3" v-if="method.isCard">{{ method.maskedNumber }}</span>
		</div>
		<div class="d-flex justify-content-between flex-wrap small">
			<a class="text-info mb-2" @click.prevent="deleteMethod">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Remove</span>
			</a>
			<p class="mb-2" v-if="method.isCard">{{ method.expired ? 'Expired' : 'Expires' }} {{ method.expirationDate }}</p>
        </div>
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
