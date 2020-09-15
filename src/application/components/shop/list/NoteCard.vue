<template>
	<div class="p-3">
		<div class="d-flex flex-column flex-md-row mb-3">
			<img :src="note.imageLink" alt="">
			<div class="p-2">
				<p class="font-weight-500 lead">Buy for &dollar;{{ note.price }}</p>
				<h3 class="font-weight-500">{{ note.title }}</h3>

				<div class="small d-flex flex-column">
					<button class="btn btn-outline-danger my-1" @click.prevent="removeFromCart(note)" v-if="isInCart(note)">Remove from cart</button>
					<button class="btn btn-outline-success my-1" @click.prevent="addToCart(note)" v-else>Add to cart</button>
					<button class="btn btn-success my-1" @click.prevent="checkoutNow(note)">Checkout now</button>
				</div>
			</div>
		</div>
		<p class="small">{{ note.description }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { useCart } from '@/usecases/shop/cart'
export default defineComponent({
	props: {
		note: {
			required: true,
			type: NoteEntity
		}
	},
	setup(){
		const { isInCart, addToCart, removeFromCart, checkoutNow } = useCart()
		return { isInCart, addToCart, removeFromCart, checkoutNow }
	}
})
</script>

<style lang="scss" scoped>
	img{ width: 100%; }
	@media (min-width: $md) {
		img{ width: 33.33%; }
	}
</style>
