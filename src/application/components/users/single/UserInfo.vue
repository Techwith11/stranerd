<template>
	<div class="d-flex flex-column align-items-center py-3 py-md-5">
		<img :src="user.image" class="profile-image" id="profileImage" alt="">
		<p class="title font-weight-bold my-3">
			<span>{{ isTutor ? 'Instructor' : 'Student' }}</span>
			<!--<i class="ml-2 rounded-pill fas fa-circle" :class="user.status.online ? 'text-success' : 'text-danger'"></i>-->
		</p>
		<p class="lead font-weight-bold">{{ user.name }}</p>
		<p class="text-center w-75">{{ user.bio }}</p>
		<div v-if="isTutor">
			<p class="text-capitalize">Courses: {{ user.teachableCourses.join(', ') }}</p>
			<p class="text-center">
				<rating-stars class="d-inline ml-1" :rating="user.tutor.rating"/>
			</p>
		</div>
		<button class="btn-success" @click="bringUpSessionForm" v-if="canHaveSession">Request session</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import RatingStars from '@/components/helpers/RatingStars.vue'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useStore } from '@/usecases/store'
export default defineComponent({
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup(props){
		return {
			isTutor: computed(() => props.user.roles.isTutor && props.user.tutor?.canTeach),
			canHaveSession: computed(() => props.user.tutor?.canTeach && props.user.id !== useStore().auth.getId.value),
			bringUpSessionForm: () => useStore().modals.setSessionModalStudentDuration({ student: useStore().auth.getId.value, tutor: props.user.id })
		}
	},
	components: {
		'rating-stars': RatingStars
	}
})
</script>

<style lang="scss" scoped>
	#profileImage{
		width: 150px;
		height: 150px;
	}
</style>
