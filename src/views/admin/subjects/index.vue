<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div class="d-flex justify-content-end">
				<button class="btn btn-success my-3" @click="setCreateModalSubject">Add New Subject</button>
			</div>
			<div>
				<div class="container">
					<subject-card :subject="subject" v-for="subject in subjects" :key="subject['.key']" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapActions } from 'vuex'
	import SubjectCard from '@/components/admin/subjects/list/SubjectCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		name: 'Subjects',
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
			window.Fire.$on('SubjectAdded', subject => this.subjects.push(subject))
			window.Fire.$on('SubjectDeleted', id => this.subjects = this.subjects.filter(s => s['.key'] !== id))
		},
		components: {
			'subject-card': SubjectCard,
			'helper-spinner': HelperSpinner
		},
		methods: {
			...mapActions(['setCreateModalSubject']),
			async getSubjects(){
				let docs = await firestore.collection('subjects').get()
				docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
			}
		}
	}
</script>