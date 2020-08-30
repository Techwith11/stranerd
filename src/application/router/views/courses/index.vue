<template>
	<Default>
		<banner>
      <h1>Courses Tailor-fit for Everyone</h1>
    </banner>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<div v-else>
				<subject-card v-for="subject in subjects" :key="subject.id" :subject="subject"/>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SubjectCard from '@/components/courses/list/SubjectCard.vue'
import { useSubjects } from '@/usecases/courses/subjects'
export default defineComponent({
	setup(){
		const { subjects, error, loading, modules } = useSubjects()
		return { subjects, error, loading, modules }
	},
	components: {
		'subject-card': SubjectCard,
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
					content: (this.modules as any)
				}
			]
		}
	}
})
</script>
