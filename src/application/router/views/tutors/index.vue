<template>
	<Default>
		<div class="container">
			<helper-spinner v-if="tutorLoading || subjectLoading" />
			<div v-else>
				<div class="row my-2">
					<div class="col-7 pr-2">
						<input type="text" class="form-control" placeholder="Search by name" v-model="name">
					</div>
					<div class="col-5 pl-0">
						<select class="form-control text-capitalize" v-model="course">
							<option value="">All</option>
							<option :value="subject.name" v-for="subject in subjects" :key="subject['.key']">{{ subject.name }}</option>
						</select>
					</div>
				</div>
				<tutor-card class="my-2" :user="tutor" v-for="tutor in filteredTutors" :key="tutor.id" />
				<helper-message :message="error" v-if="error" />
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TutorCard from '@/components/users/list/TutorCard.vue'
import { useTutorsList } from '@/usecases/users/users'
import { useSubjects } from '@/usecases/courses/subjects'
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
