<template>
	<div class="my-3">
		<h3>{{ post.title }}</h3>
		<p>
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<div v-html="post.body" class="lead editor-container"></div>
		<div class="d-flex align-items-center">
			<img :src="getImageLink" class="profile-image" id="ownerImage" alt="">
			<div>
				<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`">{{ user.bio.name }}</router-link></p>
				<p class="mb-0">{{ getDate }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			post: {
				required: true,
				type: Object
			},
			user: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getDefaultImage']),
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			getDate(){
				let d = new Date(this.post.dates.createdAt.seconds * 1000)
				return `on ${d.toDateString()} at ${d.toTimeString().slice(0,5)}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 50px; height: 50px; }
</style>
