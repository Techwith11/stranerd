<template>
	<div class="container">
		<helper-spinner v-if="isLoading" />
		<div v-else>
			<subject-card v-for="subject in getAllSubjects" :key="subject['.key']" :subject="subject"/>
		</div>
	</div>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	import SubjectCard from "@/components/courses/list/SubjectCard"
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			isLoading: true
		}),
		computed: {
			...mapGetters(['getAllSubjects']),
			getAllModules(){ return this.getAllSubjects.map(subject => [subject.name, ...subject.modules.map(m => m.name)]).join() },
		},
		methods: mapActions(['fetchAllSubjects']),
		components: {
			'subject-card': SubjectCard,
			'helper-spinner': HelperSpinner
		},
		async activated(){
			this.isLoading = true
			if(this.getAllSubjects.length === 0){
				await this.fetchAllSubjects()
			}
			this.isLoading = false
		},
		meta(){
			return {
				title: 'Courses',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: this.getAllModules
					}
				]
			}
		}
	}
</script>