<template>
	<div class="m-md-5">
		<p class="text-center my-4">{{ getOtherPersonOnSession ? getOtherPersonOnSession.bio.name : 'Someone' }} is requesting to start a {{ getCurrentSession.duration }} hour session with you</p>
		<div class="mx-2">
			<button class="bg-success text-white w-100 my-2 rounded" @click="requestSession" :disabled="isLoading">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 'accept'"></i>
				<span>Accept</span>
			</button>
			<button class="bg-danger text-white w-100 my-2 rounded" @click="cancelSession" :disabled="isLoading">
				<i class="fas fa-spin fa-spinner mr-2" v-if="isLoading && mode === 'reject'"></i>
				<span>Reject</span>
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data: () => ({
		mode: '',
		isLoading: false
	}),
	methods: {
		...mapActions(['rejectSession', 'acceptSession']),
		async requestSession(){
			this.isLoading = true
			this.mode = 'accept'
			try{
				await this.acceptSession()
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		},
		async cancelSession(){
			this.isLoading = true
			this.mode = 'reject'
			try{
				await this.rejectSession()
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		}
	},
	computed: {
		...mapGetters(['getCurrentSession','getOtherPersonOnSession'])
	}
}
</script>