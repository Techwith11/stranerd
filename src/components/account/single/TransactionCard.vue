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
				let date = new Date(this.transaction.dates.createdAt.seconds * 1000)
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return date.toTimeString().slice(0,5)
				}else if(date > yesterday){
					return 'Yesterday'
				}else{
					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		},
		mounted(){
			console.log(this.transaction)
		}
	}
</script>