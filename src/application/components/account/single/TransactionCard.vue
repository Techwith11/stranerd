<template>
	<div class="alert" role="alert" :class="transaction.status === 'authorized' ? 'alert-success' : 'alert-danger'">
		<div class="d-flex">
			<span>&dollar;{{ transaction.amount }}</span>
			<span class="ml-2">{{ transaction.type }}</span>
			<span class="ml-auto">{{ transaction.creditCard.maskedNumber }}</span>
		</div>
		<div class="d-flex justify-content-start small">
			<span>Charged {{ getDateOrTime }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		transaction: {
			required: true,
			type: Object
		}
	},
	computed: {
		getDateOrTime(){
			const date = new Date(this.transaction.dates.createdAt.seconds * 1000)
			const now = new Date()
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
			if(date > today){
				return date.toTimeString().slice(0,5)
			}else if(date > yesterday){
				return 'Yesterday'
			}else{
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
			}
		}
	}
}
</script>