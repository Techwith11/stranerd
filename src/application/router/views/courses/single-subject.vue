<template>
	<Default>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<div v-else>
				<router-link class="text-muted h5 text-decoration-none my-3 d-inline-block text-capitalize" :to="`/courses`">
					<i class="fas fa-arrow-left mr-2"></i>
					<span>All</span>
				</router-link>
				<subject-card :subject="subject"/>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import SubjectCard from "@/components/courses/list/SubjectCard.vue"
	import { useSingleSubject } from '@/usecases/courses/useSubjects'
	import router from '@/router'
	export default defineComponent({
		components: {
			'subject-card': SubjectCard,
		},
		setup(){
			const { subject } = router.currentRoute.params
			const { subject: currSubject, loading, error } = useSingleSubject(subject)
			return { subject: currSubject, loading, error }
		},
		meta(){
			return {
				title: (this.subject as any)?.name ?? 'Subject Name',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [ (this.subject as any)?.name ?? '', ...(this.subject as any)?.modules?.map((m: any) => m.name) ?? []].join(', ')
					}
				]
			}
		}
	})
</script>
