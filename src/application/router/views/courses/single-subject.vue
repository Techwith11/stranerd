<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1 class="text-capitalize">All courses for {{ subject.name }}</h1>
				<course-search class="my-2" />
			</div>
		</banner>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<template v-else>
				<subject-card :subject="subject"/>
        <h5 class="mt-5 text-capitalize">
          <router-link class="text-muted" :to="`/courses`">
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
import SubjectCard from '@/components/courses/list/SubjectCard.vue'
import { useSingleSubject } from '@/usecases/courses/subjects'
import router from '@/router'
import CourseSearch from '@/components/helpers/search/CourseSearch.vue'
export default defineComponent({
	components: {
		'subject-card': SubjectCard,
		'course-search': CourseSearch
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
