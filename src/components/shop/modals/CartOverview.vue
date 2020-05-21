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
				<tr v-for="item in getCart" :key="item['.key']">
					<td class="text-center"><i class="fas fa-times text-danger" @click="removeFromCart(item)"></i></td>
					<td>{{ item.title }}</td>
					<td>{{ item.price }}</td>
				</tr>
			</tbody>
		</table>
		<div class="d-flex justify-content-end">
			<button class="accent-button" @click.prevent="proceedToPay">Checkout Now</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: {
			...mapActions(['closeCartModal','removeFromCart','proceedToPay'])
		},
		computed: {
			...mapGetters(['getCart'])
		}
	}
</script>