<template>
	<div class="container">
		<helper-spinner v-if="isLoading" />
		<div v-else>
			<router-link class="text-muted h6 text-decoration-none my-3 d-inline-block text-capitalize" :to="`/courses`">
				<i class="fas fa-arrow-left mr-2"></i>
				<span>All</span>
			</router-link>
			<subject-card :key="subject['.key']" :subject="subject"/>
		</div>
	</div>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	import SubjectCard from "@/components/courses/list/SubjectCard"
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
			'helper-spinner': HelperSpinner
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
				await this.$router.replace('/courses')
			}
			this.isLoading = false
		},
		meta(){
			return {
				title: this.$route.params.subject ? this.$route.params.subject[0].toUpperCase() + this.$route.params.subject.slice(1).toLowerCase() : 'Subject Name',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [ this.subject.name || '', ...this.subject.modules || []].join(', ')
					}
				]
			}
		}
	}
</script>