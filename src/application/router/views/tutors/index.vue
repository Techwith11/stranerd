<template>
	<Default>
		<banner>
			<h1>Find Certified Tutors</h1>
			<div class="row my-2">
				<div class="col-8 pl-0 pr-2">
					<tutor-search></tutor-search>
				</div>
				<div class="col-4 px-0">
					<select class="form-control text-capitalize" v-model="course">
						<option value="">All</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject.id">{{ subject.name }}</option>
					</select>
				</div>
			</div>
		</banner>
		<div class="container">
			<helper-spinner v-if="tutorLoading || subjectLoading" />
			<div v-else class="grid my-4">
				<div v-for="tutor in filteredTutors" :key="tutor.id" class="shadow-sm p-3" >
					<tutor-card :user="tutor" />
				</div>
			</div>
			<helper-message :message="error" v-if="error" />
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TutorCard from '@application/components/users/list/TutorCard.vue'
import TutorSearch from '@application/components/helpers/search/TutorSearch.vue'
import { useTutorsList } from '@application/usecases/users/users'
import { useSubjects } from '@application/usecases/courses/subjects'
export default defineComponent({
	name: 'Tutors',
	setup(){
		const { subjects, loading: subjectLoading } = useSubjects()
		const { loading: tutorLoading, error, filteredTutors, course, name } = useTutorsList()
		return {
			error, filteredTutors, course, name, subjects,
			subjectLoading, tutorLoading
		}
	},
	components: {
		'tutor-card': TutorCard,
		'tutor-search': TutorSearch,
	},
	meta(){
		return {
			title: 'Stranerd Tutors',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: ''
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

<style lang="scss" scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
}
@media (min-width: $md) {
  .grid{
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
