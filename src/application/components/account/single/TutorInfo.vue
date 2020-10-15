<template>
	<div v-if="getUser.roles.isTutor" class="row">
		<div class="col-md-6 mb-3">
			<div class="p-3 rounded-lg shadow-sm bg-white">
				<p class="text-center font-weight-500 mb-4 text-muted">Tutor</p>
				<ul class="list-group">
					<li class="d-flex justify-content-between align-items-center mb-2">
						<span class="font-weight-bold">Courses</span>
						<span class="font-weight-bold">Tested</span>
					</li>
					<li class=" d-flex justify-content-between align-items-center mb-2" v-for="course in getUser.tutor.courses" :key="course">
						<span class="text-capitalize">{{ course }}</span>
						<span class="text-success" v-if="getUser.tutor.levels[course] > 0">
							<i class="fas fa-check"></i>
							<i class="ml-n2 fas fa-check"></i>
						</span>
						<span v-else>
							<i class="fas fa-times-circle text-danger mr-2"></i>
							<router-link class="text-info" :to="`/tests/tutors?course=${course.toLowerCase()}`">Take test</router-link>
						</span>
					</li>
					<li class="d-flex justify-content-between align-items-center mt-2">
						<span class="font-weight-bold">Average Rating</span>
						<rating-stars :rating="getUser.tutor.rating" />
					</li>
				</ul>
			</div>
		</div>
		<div class="col-md-6 mb-3">
			<div class="p-3 rounded-lg shadow-sm bg-white">
				<p class="text-center font-weight-500 mb-4 text-muted">Tests</p>
				<tests-list />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import RatingStars from '@application/components/helpers/RatingStars.vue'
import TestsList from '@application/components/account/single/TestsList.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	setup(){
		return {
			getUser: useStore().auth.getUser,
		}
	},
	components: {
		'rating-stars': RatingStars,
		'tests-list': TestsList
	}
})
</script>

<style lang="scss" scoped>
	img.profile-image{ width: 120px; height: 120px; border: 3px solid $primary-dark; }
</style>
