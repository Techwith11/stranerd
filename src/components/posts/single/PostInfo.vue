<template>
	<div class="my-3">
		<h4>{{ post.title }}</h4>
		<div v-html="post.body" class="lead editor-container"></div>
		<div class="small d-flex">
			<img :src="getImageLink" class="mr-2" width="50px" alt="">
			<div>
				<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`" target="_blank">{{ user.bio.name }}</router-link></p>
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