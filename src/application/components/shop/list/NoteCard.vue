<template>
	<div class="rounded-xl shadow-sm d-flex flex-column flex-md-row align-items-start p-2">
		<img :src="note.imageLink" alt="">
		<div class="px-2">
			<h5 class="d-flex justify-content-between mb-1">
				<span>{{ note.title }}</span>
				<span class="text-success">${{ note.price }}</span>
			</h5>
			<div class="d-flex small my-1">
				<a class="mr-3 text-danger" @click.prevent="removeFromCart(note)" v-if="isInCart(note)"><i class="fas fa-cart-arrow-down mr-1"></i>Remove</a>
				<a class="mr-3 text-info" @click.prevent="addToCart(note)" v-else><i class="fas fa-cart-plus mr-1"></i>Add to cart</a>
				<a class="text-success" @click.prevent="checkoutNow(note)"><i class="fas fa-shopping-bag mr-1"></i>Checkout now</a>
			</div>
			<p class="small mb-1">{{ note.description }}</p>
			<p class="small mb-1">Uploaded {{ note.createdDate }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { useCart } from '@/usecases/shop/useCart'
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
