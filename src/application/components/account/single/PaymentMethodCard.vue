<template>
	<div class="alert" role="alert" :class="{'alert-danger': method.expired, 'alert-warning': !method.expired}">
		<div class="d-flex">
			<span>{{ method.cardType }}</span>
			<span class="ml-3">{{ method.maskedNumber }}</span>
			<span class="ml-auto"><span class="d-none d-sm-inline">Expires </span>{{ method.expirationDate }}</span>
		</div>
		<div class="d-flex justify-content-between small">
			<span>Added {{ getDateOrTime }}</span>
			<a class="text-info" @click.prevent="remove">Remove</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		method: {
			required: true,
			type: Object
		},
		onRemove: {
			required: true,
			type: Function
		}
	},
	computed: {
		getDateOrTime(){
			let date = new Date(this.method.dates.createdAt.seconds * 1000)
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
	methods: {
		async remove(){
			await this.onRemove(this.method)
		}
	}
}
</script>