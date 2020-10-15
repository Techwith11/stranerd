<template>
	<Default>
		<banner>
			<h1 class="text-capitalize">Modify questions under each subject</h1>
		</banner>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading" />
			<div class="grid" v-else>
				<router-link class="text-dark h4 text-decoration-none mt-3 text-capitalize"
					:to="`/admins/questions/${subject.name.toLowerCase()}`"
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
export default defineComponent({
	setup(){
		const { subjects, error, loading, modules } = useSubjects()
		return { subjects, error, loading, modules }
	},
	meta(){
		return {
			title: 'Tutors Tests Questions',
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
