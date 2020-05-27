<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			{{ paymentMethods }}
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		data: () => ({
			paymentMethods: [],
			isLoading: true
		}),
		computed: {
			...mapGetters(['getId']),
		},
		methods: {
			...mapActions([]),
			async fetchPaymentMethods(){
				let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).orderBy('dates.createdAt','desc').get()
				docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
			}
		},
		async mounted() {
			await this.fetchPaymentMethods()
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner
		}
	}
</script>