<template>
	<div class="d-flex flex-column align-items-center py-3 py-md-5">
		<img :src="getImageLink" id="profileImage" alt="">
		<p class="title font-weight-bold my-3">
			<span>{{ user.roles.isTutor ? 'Instructor' : 'Student' }}</span>
			<i class="ml-2 rounded-pill fas fa-circle" :class="user.status.online ? 'text-success' : 'text-danger'"></i>
		</p>
		<p class="lead font-weight-bold">{{ user.bio.name }}</p>
		<p class="text-center">{{ user.bio.bio }}</p>
		<div v-if="user.roles.isTutor">
			<p>Course: {{ user.tutor.course }}</p>
			<p>Overall Ratings: {{ user.tutor.ratings | getRatings }} of {{ user.tutor.ratings.length }} reviews</p>
		</div>
		<button class="accent-button" @click="$router.push(`/chats/${user['.key']}`)">Chat with {{ user.bio.name }}</button>
	</div>
</template>

<script>
	export default {
		props: {
			user: {
				required: true,
				type: Object
			}
		},
		filters: {
			getRatings: ratings => ratings.length ? ratings.reduce((a,b) => a+b) / ratings.length : 0
		},
		computed: {
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : '/users/images/Cassette.svg' }
		}
	}
</script>

<style lang="scss" scoped>
	#profileImage{
		width: 40%;
		min-width: 50px;
		max-width: 150px;
	}
</style>