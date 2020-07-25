<template>
	<div class="p-2">
		<div class="d-flex align-items-center">
			<img :src="getImageLink" alt="" class="profile-image">
			<div>
				<router-link :to="`/users/${user['.key']}`" class="card-link">
					<h6 class="card-title mb-0">{{ user.bio.name }}</h6>
				</router-link>
				<p class="card-text mb-0">
					Teaches:
					<span class="text-capitalize" v-for="course in getCourses" :key="course">{{ course }}</span>
				</p>
				<rating-stars class="small d-inline" :rating="user.tutor.rating"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import RatingStars from '@/components/helpers/RatingStars'
	export default {
		props: {
			user: {
				required: true,
				type: Object
			}
		},
		computed: {
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			...mapGetters(['getDefaultImage']),
			getCourses(){
				return this.user.tutor.courses.filter(course => {
					return this.user.tutor.levels[course] > 0
				})
			}
		},
		components: {
			'rating-stars': RatingStars
		}
	}
</script>
