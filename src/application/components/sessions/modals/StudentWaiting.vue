<template>
	<div class="m-md-5 text-center" id="waiting">
		<i class="fas fa-spinner fa-spin text-info fa-3x" v-if="!isLoading"></i>
		<p class="my-3" v-if="!isLoading">Waiting for {{ getOtherPersonOnSession ? getOtherPersonOnSession.bio.name : 'tutor' }} to accept</p>
		<p class="my-3" v-if="isLoading">You are attempting to cancel the session</p>
		<button class="bg-danger text-white my-2 rounded" @click="closeModal" :disabled="isLoading">
			<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading"></i>
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