<template>
	<search collection="notes" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<div class="text-dark small">
				<h6 class="mb-0 text-truncate">
					<ais-highlight :hit="item" attribute="title" />
				</h6>
				<p class="mb-0"><ais-highlight :hit="item" attribute="description" /></p>
				<p class="mb-0">${{ item.note.price }}</p>
				<div class="small">
					<button class="btn btn-outline-danger my-1" @click.prevent="removeFromCart(item.note)" v-if="isInCart(item.note)">Remove from cart</button>
					<button class="btn btn-outline-success my-1" @click.prevent="addToCart(item.note)" v-else>Add to cart</button>
				</div>
			</div>
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NoteFromModel } from '@root/modules/shop/data/models/note'
import { useCart } from '@/usecases/shop/cart'
export default defineComponent({
	setup(){
		const { isInCart, addToCart, removeFromCart } = useCart()
		return {
			isInCart, addToCart, removeFromCart,
			transformResults: (items: any[]) => items
				.map((item) => {
					const { objectID: id, title, description, price } = item as NoteFromModel & { objectID: string }
					item.note = { id, title, description, price }
					return item
				})
		}
	}
})
</script>
