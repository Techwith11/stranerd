<template>
	<Default>
    <Banner>
      <h1 class="text-capitalize">All modules under {{ subject.name }}</h1>
    </Banner>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<template v-else>
				<subject-card :subject="subject"/>
        <h5 class="mt-5 text-capitalize">
          <router-link class="text-muted" :to="`/admins/questions`">
            <span>Back to all courses</span>
            <i class="fas fa-arrow-left ml-2"></i>
          </router-link>
        </h5>
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
