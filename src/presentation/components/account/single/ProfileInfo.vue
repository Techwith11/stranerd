<template>
	<div class="row align-items-start">
		<div class="col-md-7 mb-4">
			<div class="d-flex align-items-center align-items-md-start mb-3">
				<div class="">
					<img :src="getUserImageLink" alt="" class="profile-image" id="userImage">
					<a href="" class="text-info d-block" @click.prevent="setAccountModalEditProfile">Change picture</a>
				</div>
				<div class="flex-grow-1">
					<h4 class="text-primary-dark my-1">{{ getUser.bio.name }}</h4>
					<h6 class="mb-3 small">{{ getUser.bio.email }}</h6>
					<div class="d-none d-md-block">
						<div class="bordered p-3 w-100 bg-white mb-3 rounded-xl">
							<p><span class="font-weight-bold">Bio:</span> {{ getUser.bio.bio }}</p>
						</div>
						<div class="d-flex justify-content-end">
							<a href="" class="text-info" @click.prevent="setAccountModalEditProfile">Change bio</a>
						</div>
					</div>
				</div>
			</div>
			<div class="d-md-none">
				<div class="bordered p-3 w-100 bg-white mb-3 rounded-xl">
					<p><span class="font-weight-bold">Bio:</span> {{ getUser.bio.bio }}</p>
				</div>
				<div class="d-flex justify-content-end">
					<a href="" class="text-info" @click.prevent="setAccountModalEditProfile">Change bio</a>
				</div>
			</div>
		</div>
		<div class="col-md-5" v-if="getUser.roles.isTutor">
			<div class="p-3 bordered rounded-xl bg-white">
				<p class="small font-weight-bold text-center">Tutor</p>
				<ul class="list-group">
					<li class=" d-flex justify-content-between align-items-center mb-2" v-for="course in getUser.tutor.courses" :key="course">
						<span class="text-capitalize">{{ course }}</span>
						<span class="text-success" v-if="getUser.tutor.levels[course] > 0">
								<i class="fas fa-check"></i>
								<i class="ml-n2 fas fa-check"></i>
							</span>
						<router-link class="text-info" v-else :to="`/tests/tutors?course=${course.toLowerCase()}`">Take test</router-link>
					</li>
					<li class="d-flex justify-content-between align-items-center mt-2">
						<span>Average Rating</span>
						<rating-stars :rating="getUser.tutor.rating" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import RatingStars from '@/components/helpers/RatingStars'
	export default {
		computed: {
			...mapGetters(['getUser', 'getDefaultImage']),
			getUserImageLink() {
				return this.getUser && this.getUser.bio.image ? this.getUser.bio.image.link : this.getDefaultImage
			}
		},
		methods: {
			...mapActions(['setAccountModalEditProfile'])
		},
		components: {
			'rating-stars': RatingStars
		}
	}
</script>

<style lang="scss" scoped>
	img#userImage{ min-width: 120px; width: 120px; height: 120px; border: 4px solid #FCCAE3; }
	.rounded-xl{
		border-radius: 2.0rem !important;
		box-shadow: 0 1px 2px $text-black;
	}
	.text-primary-dark{ color: $primary-dark }
</style>
