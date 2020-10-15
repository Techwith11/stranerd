<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">My Cart</h4>
			<a @click.prevent="closeCartModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<table class="table rounded w-100">
			<thead class="thead-dark">
				<tr>
					<th scope="col"></th>
					<th scope="col">Item</th>
					<th scope="col">Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="note in cart" :key="note.id">
					<th scope="row" class="text-center"><i class="fas fa-times text-danger" @click="removeFromCart(note)"></i></th>
					<td>{{ note.title }}</td>
					<td>{{ note.price }}</td>
				</tr>
				<tr>
					<th scope="row"></th>
					<td>Total</td>
					<td>{{ cartPrice }}</td>
				</tr>
			</tbody>
		</table>
		<div class="d-flex justify-content-end">
			<button class="btn-success" @click.prevent="setCartModalPay">Checkout Now</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCart } from '@application/usecases/shop/cart'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	setup(){
		const { cart, removeFromCart, cartPrice } = useCart()
		return {
			cart, removeFromCart, cartPrice,
			closeCartModal: useStore().modals.closeCartModal,
			setCartModalPay: useStore().modals.setCartModalPay,
		}
	}
})
</script>
