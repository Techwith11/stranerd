<template>
	<div class="modal-background">
		<div class="modal-inner">
			<cart-overview v-if="isCartModalOverview" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CartOverview from '@/components/shop/modals/CartOverview'
	export default {
		components: {
			'cart-overview': CartOverview
		},
		computed: mapGetters(['isCartModalOverview'])
	}
</script>