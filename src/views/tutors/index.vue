<template>
	<Default>
		<div class="container">
			<helper-spinner v-if="isLoading" />
			<div v-else>
				<div class="row my-2">
					<div class="col-7 pr-2">
						<input type="text" class="form-control" placeholder="Search by name" v-model="name">
					</div>
					<div class="col-5 pl-0">
						<select class="form-control text-capitalize" v-model="course">
							<option value="All">All</option>
							<option :value="subject.name" v-for="subject in getAllSubjects" :key="subject['.key']">{{ subject.name }}</option>
						</select>
					</div>
				</div>
				<tutor-card class="my-2" :user="tutor" v-for="tutor in filteredTutors" :key="tutor['.key']" />
				<helper-message message="No tutors available" v-if="filteredTutors.length === 0" />
			</div>
		</div>
	</Default>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import TutorCard from '@/components/users/list/TutorCard'
	export default {
		name: 'Tutors',
		data: () => ({
			isLoading: true,
			tutors: [],
			course: 'All',
			name: ''
		}),
		computed: {
			...mapGetters(['getAllSubjects']),
			filteredTutors(){
				let filtered = this.tutors
				if(this.course !== 'All'){ filtered = filtered.filter(tutor => tutor.tutor.courses.includes(this.course) && tutor.tutor.levels[this.course] > 0) }
				return filtered.filter(tutor => tutor.bio.name.toLowerCase().includes(this.name.toLowerCase()))
			}
		},
		async mounted(){
			try{
				let docs = await firestore.collection('users')
					.where('roles.isTutor','==',true)
					.where('tutor.canTeach','==',true)
					.orderBy('tutor.rating','desc')
					.get()
				docs.forEach(doc => this.tutors.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching tutors. Try refreshing the page' }) }
			this.isLoading = false
		},
		components: {
			'tutor-card': TutorCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
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
	}
</script>
