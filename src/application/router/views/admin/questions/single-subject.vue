<template>
	<Default>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<template v-else>
				<router-link class="text-muted h6 text-decoration-none my-3 d-inline-block text-capitalize" :to="`/admins/questions`">
					<i class="fas fa-arrow-left mr-2"></i>
					<span>All</span>
				</router-link>
				<subject-card :subject="subject"/>
			</template>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SubjectCard from '@/components/admin/questions/list/SubjectCard.vue'
import { useSingleSubject } from '@/usecases/courses/subjects'
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
			title: `${((this.subject as any)?.name && (this.subject as any)?.name[0].toUpperCase() + (this.subject as any)?.name.slice(1).toLowerCase()) ?? ''} Tutors Tests Questions`,
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
