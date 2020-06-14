<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No subjects available at the moment. Try adding some new ones." v-if="subjects.length === 0" />
			<div v-else>
				<div class="container">
					<subject-card :subject="subject" v-for="subject in subjects" :key="subject['.key']" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import SubjectCard from '@/components/admin/subjects/list/SubjectCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'Notes',
		data: () => ({
			subjects: [],
			isLoading: true
		}),
		async mounted() {
			await this.getSubjects()
			this.isLoading = false
			window.Fire.$on('SubjectEdited', subject => {
				let index = this.subjects.findIndex(s => s['.key'] === subject['.key'])
				this.subjects[index] = subject
				this.$forceUpdate()
			})
			window.Fire.$on('SubjectDeleted', subject => this.subjects = this.subjects.filter(s => s['.key'] !== subject['.key']))
		},
		components: {
			'subject-card': SubjectCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		methods: {
			async getSubjects(){
				let docs = await firestore.collection('subjects').get()
				docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
			}
		}
	}
</script>