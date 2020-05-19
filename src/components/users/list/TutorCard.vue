<template>
	<div class="card px-sm-3">
		<div class="row">
			<div class="col-sm-3 d-flex justify-content-center">
				<img :src="getImageLink" alt="">
			</div>
			<div class="col-sm-9 px-sm-0">
				<div class="card-body px-sm-0">
					<h5 class="card-title">
						<span class="mr-2">{{ user.bio.name }}</span>
						<rating-stars class="small d-inline" :rating="user.tutor.rating"/>
					</h5>
					<p class="card-text mb-1">{{ user.bio.bio }}</p>
					<p class="card-text mb-1">Courses: {{ getCourses }}</p>
					<router-link :to="`/users/${user['.key']}`" class="card-link">Visit Profile</router-link>
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
				}).join(',')
			}
		},
		components: {
			'rating-stars': RatingStars
		}
	}
</script>

<style lang="scss" scoped>
	img{
		width: 100%;
		max-width: 150px;
	}
	@media screen and (max-width: 575px){
		img{
			width: 40% !important;
			margin: 1rem auto;
		}
	}
</style>