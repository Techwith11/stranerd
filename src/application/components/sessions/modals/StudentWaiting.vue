<template>
	<div class="m-md-5 text-center" id="waiting">
		<loading :size="3" v-if="!isLoading" />
		<p class="my-3" v-if="!isLoading">Waiting for {{ getOtherPersonOnSession ? getOtherPersonOnSession.bio.name : 'tutor' }} to accept</p>
		<p class="my-3" v-if="isLoading">You are attempting to cancel the session</p>
		<button class="bg-danger text-white my-2 rounded" @click="closeModal" :disabled="isLoading">
			<loading class="mr-2" v-if="isLoading" />
			Cancel Session
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
