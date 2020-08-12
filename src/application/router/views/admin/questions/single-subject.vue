<template>
	<div class="container-fluid py-3">
		<helper-spinner v-if="isLoading" />
		<div v-else>
			<router-link class="text-muted h6 text-decoration-none my-3 d-inline-block text-capitalize" :to="`/admins/questions`">
				<i class="fas fa-arrow-left mr-2"></i>
				<span>All</span>
			</router-link>
			<subject-card :key="subject['.key']" :subject="subject"/>
		</div>
	</div>
</template>

<script>
	import SubjectCard from "@/components/admin/questions/list/SubjectCard"
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			subject: {},
			isLoading: true
		}),
		computed: mapGetters(['getAllSubjects']),
		methods: mapActions(['fetchAllSubjects']),
		components: {
			'subject-card': SubjectCard,
		},
		async activated(){
			this.isLoading = true
			let name = this.$route.params.subject
			if(this.getAllSubjects.length === 0){
				await this.fetchAllSubjects()
			}
			let subject = this.getAllSubjects.find(s => s.name.toLowerCase() === name.toLowerCase())
			if(subject){
				this.subject = subject
			}else{
				await this.$router.replace('/admins/questions')
			}
			this.isLoading = false
		},
		meta(){
			return {
				title: `${this.subject.name && this.subject.name[0].toUpperCase() + this.subject.name.slice(1).toLowerCase()} Tutors Tests Questions`,
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
