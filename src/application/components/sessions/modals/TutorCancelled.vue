<template>
	<div class="m-md-5 text-center">
		<p class="my-3 lead text-danger">{{ getOtherPersonOnSession ? getOtherPersonOnSession.bio.name : 'Someone' }} declined to start a session. You can try asking again later.</p>
		<button class="bg-info text-white my-2 rounded" @click="closeModal" :disabled="isLoading">
			<loading class="mr-2" v-if="isLoading" />
			Close Session
		</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	data: () => ({
		isLoading: false,
	}),
	methods: {
		...mapActions(['cancelSessionAndCloseModal']),
		async closeModal(){
			this.isLoading = true
			await this.cancelSessionAndCloseModal()
		}
	},
	computed: {
		...mapGetters(['getOtherPersonOnSession'])
	}
}
</script>
