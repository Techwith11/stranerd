<template>
	<Default>
		<div class="container">
			<helper-spinner v-if="loading" />
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
	export default defineComponent({
		name: 'Tutors',
		setup(){
			const { loading, error, filteredTutors, course, name, subjects } = useTutorsList()
			return {
				loading, error, filteredTutors, course, name, subjects
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
