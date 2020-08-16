<template>
	<div class="my-3 alert border border-secondary">
		<div class="mb-1 font-weight-bold d-flex justify-content-between">
			<span>{{ note.title }}</span>
			<span class="text-success">&dollar;{{ note.price }}</span>
		</div>
		<p class="mb-1">{{ note.description }}</p>
		<p class="mb-1 small">Uploaded {{ note.createdDate }}</p>
		<div class="d-flex" id="checkoutOptions">
			<button class="px-3 ml-0 btn-sm rounded mr-2 btn-danger" @click.prevent="removeFromCart(note)" v-if="isInCart(note)">Remove</button>
			<button class="px-3 ml-0 btn-sm rounded mr-2 btn-info" @click.prevent="addToCart(note)" v-else><i class="fas fa-shopping-basket mr-2"></i>Add to cart</button>
			<button class="px-3 ml-0 btn-sm rounded btn-success" @click.prevent="checkoutItem(note)"><i class="fas fa-money-bill mr-2"></i>Checkout now</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { NoteEntity } from '@root/modules/shop/domain/entities/note'
	import store from '@/store'
	export default defineComponent({
		props: {
			note: {
				required: true,
				type: NoteEntity
			}
		},
		setup(){
			return {
				isInCart: (note: NoteEntity) => store.getters.isInCart(note),
				addToCart: (note: NoteEntity) => store.dispatch('addToCart', note),
				removeFromCart: (note: NoteEntity) => store.dispatch('removeFromCart', note),
				checkoutItem: (note: NoteEntity) => {
					store.dispatch('addToCart', note)
					store.dispatch('setCartModalPay')
				}
			}
		}
	})
</script>

<style lang="scss" scoped>
	@media (max-width: 435px){
		button{
			font-size: 0.80rem;
		}
	}
	@media (max-width: 394px){
		button{
			font-size: 0.75rem;
		}
	}
	@media (max-width: 382px){
		button{
			font-size: 0.70rem;
		}
	}
	@media (max-width: 370px){
		button{
			font-size: 0.65rem;
		}
	}
	@media (max-width: 358px){
		button{
			font-size: 0.60rem;
		}
	}
	@media (max-width: 350px){
		button{
			font-size: 0.65rem;
		}
		i{
			display: none;
		}
	}
</style>
