<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1>Courses Tailor-fit for Everyone</h1>
				<course-search class="my-2" />
			</div>
		</banner>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<div class="grid" v-else>
				<router-link class="text-dark h4 text-decoration-none mt-3 text-capitalize"
					:to="`/courses/${subject.name.toLowerCase()}`"
					v-for="subject in subjects" :key="subject.id">
					<img :src="subject.image" alt="" class="w-100" height="180">
					<div class="bg-gold-light text-center">
						<h4>{{ subject.name }}</h4>
					</div>
				</router-link>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSubjects } from '@application/usecases/courses/subjects'
import CourseSearch from '@application/components/helpers/search/CourseSearch.vue'
export default defineComponent({
	setup(){
		const { subjects, error, loading, modules } = useSubjects()
		return { subjects, error, loading, modules }
	},
	components: {
		'course-search': CourseSearch,
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
