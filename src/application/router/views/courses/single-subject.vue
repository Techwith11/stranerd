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
			<div class="grid" v-else>
				<router-link class="text-dark h4 text-decoration-none mt-3 text-capitalize"
					:to="`/courses/${subject.name.toLowerCase()}/${module.name.toLowerCase()}`"
					v-for="module in subject.modules" :key="module.name">
					<img :src="module.image" alt="" class="w-100" height="180">
					<div class="bg-gold-light text-center">
						<h4>{{ module.name }}</h4>
					</div>
				</router-link>
			</div>
			<h5 class="my-5 text-capitalize text-center">
				<router-link class="text-muted" :to="`/courses`">
					<i class="fas fa-arrow-left mr-2"></i>
					<span>Back to all subjects</span>
				</router-link>
			</h5>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSingleSubject } from '@application/usecases/courses/subjects'
import router from '@application/router'
import CourseSearch from '@application/components/helpers/search/CourseSearch.vue'
export default defineComponent({
	components: {
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

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
}
@media (min-width: $sm) {
	.grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: $md) {
	.grid{ grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: $lg) {
	.grid{ grid-template-columns: repeat(4, 1fr); }
}
</style>
