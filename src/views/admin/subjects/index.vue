<template>
	<div class="container">
		<div class="d-flex justify-content-end">
			<button class="btn btn-success my-3" @click="setCreateModalSubject">Add New Subject</button>
		</div>
		<subject-card :subject="subject" v-for="subject in getAllSubjects" :key="subject['.key']" />
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex'
	import SubjectCard from '@/components/admin/subjects/list/SubjectCard'
	export default {
		name: 'Subjects',
		components: {
			'subject-card': SubjectCard
		},
		computed: mapGetters(['getAllSubjects']),
		methods: mapActions(['setCreateModalSubject']),
		meta(){
			return {
				title: 'Subjects',
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