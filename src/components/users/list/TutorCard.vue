<template>
	<div class="card">
		<div class="row">
			<div class="col-sm-3 d-flex justify-content-center">
				<img :src="getImageLink" alt="">
			</div>
			<div class="col-sm-9 pl-sm-0">
				<div class="card-body pl-sm-0">
					<h5 class="card-title">{{ user.bio.name }}</h5>
					<p class="card-text mb-1">{{ user.bio.bio }}</p>
					<p class="card-text mb-1">Course: {{ user.tutor.courses.join('  ') }}</p>
					<rating-stars class="small" :rating="user.tutor.rating"/>
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
			...mapGetters(['getDefaultImage'])
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