<template>
	<div class="border border-secondary rounded py-2 px-sm-3">
		<div class="row">
			<div class="col-sm-3 text-center my-auto">
				<img :src="getImageLink" alt="" class="w-100">
			</div>
			<div class="col-sm-9 px-sm-0">
				<div class="card-body px-sm-0">
					<h5 class="card-title">
						<span class="mr-2">{{ user.bio.name }}</span>
						<rating-stars class="small d-inline" :rating="user.tutor.rating"/>
					</h5>
					<p class="card-text mb-1">{{ user.bio.bio }}</p>
					<p class="card-text mb-1">
						Courses:
						<span class="text-capitalize" v-for="course in getCourses" :key="course">{{ course }}</span>
					</p>
					<div class="d-flex justify-content-end">
						<router-link :to="`/users/${user['.key']}`" class="card-link btn btn-outline-primary">Visit Profile</router-link>
					</div>
				</div>
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

<style lang="scss" scoped>
	img{
		width: 25%;
		max-width: 150px;
	}
</style>