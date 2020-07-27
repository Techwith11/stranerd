<template>
	<div class="d-flex flex-column align-items-center py-3 py-md-5">
		<img :src="getImageLink" class="profile-image" id="profileImage" alt="">
		<p class="title font-weight-bold my-3">
			<span>{{ isTutor ? 'Instructor' : 'Student' }}</span>
			<i class="ml-2 rounded-pill fas fa-circle" :class="user.status.online ? 'text-success' : 'text-danger'"></i>
		</p>
		<p class="lead font-weight-bold">{{ user.bio.name }}</p>
		<p class="text-center w-75">{{ user.bio.bio }}</p>
		<div v-if="isTutor">
			<p class="text-capitalize">Courses: {{ getCourses }}</p>
			<p class="text-center">
				<rating-stars class="d-inline ml-1" :rating="user.tutor.rating"/>
			</p>
		</div>
		<button class="btn-success" @click="bringUpSessionForm" v-if="canHaveSession">Request session</button>
	</div>
</template>

<script>
	import { mapGetters, mapActions} from 'vuex'
	import RatingStars from '@/components/helpers/RatingStars'
	export default {
		props: {
			user: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getDefaultImage','getId']),
			isTutor(){ return this.user.roles.isTutor && this.user.tutor.canTeach },
			getCourses(){ return this.user.tutor.courses.filter(x => this.user.tutor.levels[x] > 0).join(', ') },
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			canHaveSession(){ return this.user.roles && this.user.roles.isTutor && this.user['.key'] !== this.getId && this.user.tutor.levels[this.user.tutor.courses[0]] > 0 }
		},
		methods:{
			...mapActions(['setSessionModalStudentDuration']),
			bringUpSessionForm(){
				this.setSessionModalStudentDuration({ student: this.getId, tutor: this.user['.key'] })
			}
		},
		components: {
			'rating-stars': RatingStars
		}
	}
</script>

<style lang="scss" scoped>
	#profileImage{
		width: 150px;
		height: 150px;
	}
</style>
