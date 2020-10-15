<template>
	<Default>
		<page-loading v-if="loading"/>
		<template v-else>
			<helper-message v-if="error" :message="error" />
			<template v-else>
				<single-video :course="course" />
				<single-nav />
				<single-overview v-if="isOverview" :course="course" />
				<single-discussions v-else-if="isDiscussions" :course="course" />
				<single-documents v-else-if="isDocuments" :course="course" />
			</template>
		</template>
	</Default>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'
import SingleVideo from '@application/components/courses/single/SingleVideo.vue'
import SingleNav from '@application/components/courses/single/SingleNav.vue'
import SingleOverview from '@application/components/courses/single/SingleOverview.vue'
import SingleDiscussions from '@application/components/courses/single/SingleDiscussions.vue'
import SingleDocuments from '@application/components/courses/single/SingleDocuments.vue'
import { useSingleCourse } from '@application/usecases/courses/courses'
import router from '@application/router'
export default defineComponent({
	name: 'Course',
	setup(){
		const route = reactive(router)
		const { id } = route.currentRoute.params
		const { course, loading, error } = useSingleCourse(id)
		return {
			course, loading, error,
			isOverview: computed(() => !route.currentRoute.query.tab || route.currentRoute.query.tab === 'overview'),
			isDiscussions: computed(() => route.currentRoute.query.tab === 'discussions'),
			isDocuments: computed(() => route.currentRoute.query.tab === 'documents')
		}
	},
	components: {
		'single-video': SingleVideo,
		'single-nav': SingleNav,
		'single-overview': SingleOverview,
		'single-discussions': SingleDiscussions,
		'single-documents': SingleDocuments,
	},
	meta(){
		return {
			title: (this.course as any)?.title ?? 'Course Title',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: (this.course as any)?.trimmedDescription ?? ''
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: [].join(', ')
				}
			]
		}
	}
})
</script>
