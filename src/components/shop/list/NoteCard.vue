<template>
	<div class="my-3 alert border border-secondary">
		<div class="mb-1 font-weight-bold d-flex justify-content-between">
			<span>{{ note.title }}</span>
			<span class="text-success">&dollar;{{ note.price }}</span>
		</div>
		<p class="mb-1">{{ note.description }}</p>
		<p class="mb-1 small">Uploaded {{ note.dates.createdAt | getDateOrTime }}</p>
		<div class="d-flex" id="checkoutOptions">
			<button class="px-3 btn-sm rounded mr-3 btn-danger" @click.prevent="removeFromCart(note)" v-if="isInCart(note)">Remove</button>
			<button class="px-3 btn-sm rounded mr-3 btn-info" @click.prevent="addToCart(note)" v-else><i class="fas fa-shopping-basket mr-2"></i>Add to cart</button>
			<button class="px-3 btn-sm rounded btn-success" @click.prevent="checkoutItem(note)"><i class="fas fa-money-bill mr-2"></i>Checkout now</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		props: {
			note: {
				required: true,
				type: Object
			}
		},
		filters: {
			getDateOrTime(date){
				date = new Date(date.seconds * 1000)
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return `at ${date.toTimeString().slice(0,5)}`
				}else if(date > yesterday){
					return `Yesterday`
				}else{
					return `on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		},
		computed: mapGetters(['isInCart']),
		methods: {
			...mapActions(['addToCart', 'proceedToPay', 'removeFromCart']),
			checkoutItem(note){
				this.addToCart(note)
				this.proceedToPay()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media (max-width: 435px){
		button{
			font-size: 0.85rem;
		}
	}
	@media (max-width: 394px){
		button{
			font-size: 0.80rem;
		}
	}
	@media (max-width: 382px){
		button{
			font-size: 0.75rem;
		}
	}
	@media (max-width: 370px){
		button{
			font-size: 0.70rem;
		}
	}
	@media (max-width: 358px){
		button{
			font-size: 0.65rem;
		}
	}
	@media (max-width: 346px){
		button{
			font-size: 0.70rem;
		}
		i{
			display: none;
		}
	}
</style>