<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div class="container" v-else>
			<router-link :to="`/admins/questions/${subject.name}`" v-for="subject in getAllSubjects" :key="subject['.key']"
				class="text-decoration-none alert alert-dark d-block my-3">
				<h5 class="card-title mb-0 text-capitalize">{{ subject.name }}</h5>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		name: 'Questions',
		data: () => ({
			isLoading: true,
		}),
		computed: {
			...mapGetters(['getAllSubjects']),
		},
		async activated(){
			this.isLoading = true
			if(this.getAllSubjects.length === 0){
				await this.fetchAllSubjects()
			}
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner,
		},
		methods: {
			...mapActions(['fetchAllSubjects']),
		},
		meta(){
			return {
				title: 'Tutors Tests Questions',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>