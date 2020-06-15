<template>
	<div class="container">
		<helper-spinner v-if="isLoading" />
		<subject-card v-else :key="subject['.key']" :subject="subject"/>
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
		}
	}
</script>