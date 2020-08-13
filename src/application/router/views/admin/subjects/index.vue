<template>
	<div class="container-fluid py-3">
		<helper-spinner v-if="loading" />
		<template v-else>
			<div class="d-flex justify-content-end">
				<button class="btn btn-success my-3" @click="setCreateModalSubject">Add New Subject</button>
			</div>
			<subject-card :subject="subject" v-for="subject in subjects" :key="subject.id" />
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import SubjectCard from '@/components/admin/subjects/list/SubjectCard.vue'
	import { useSubjects } from '@/usecases/courses/subject'
	import store from '@/store'
	export default defineComponent({
		name: 'Subjects',
		components: {
			'subject-card': SubjectCard
		},
		setup(){
			const { loading, subjects, error } = useSubjects()
			return {
				loading, subjects, error,
				setCreateModalSubject: () => store.dispatch('setCreateModalSubject')
			}
		},
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
	})
</script>
