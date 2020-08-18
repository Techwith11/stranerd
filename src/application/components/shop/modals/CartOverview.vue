<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">My Cart</h4>
			<a @click.prevent="closeCartModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<table class="table table-striped table-bordered rounded w-100">
			<thead>
				<tr>
					<th></th>
					<th>Item</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="note in cart" :key="note.id">
					<td class="text-center"><i class="fas fa-times text-danger" @click="removeFromCart(note)"></i></td>
					<td>{{ note.title }}</td>
					<td>{{ note.price }}</td>
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
import { useCart } from '@/usecases/shop/cart'
import store from '@/store'
export default defineComponent({
	setup(){
		const { cart, removeFromCart } = useCart()
		return {
			cart, removeFromCart,
			closeCartModal: () => store.dispatch('closeCartModal'),
			setCartModalPay: () => store.dispatch('setCartModalPay'),
		}
	}
})
</script>
