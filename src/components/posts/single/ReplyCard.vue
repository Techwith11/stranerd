<template>
	<div class="my-3 border border-secondary py-1 px-2 rounded">
		<p class="mb-1">{{ reply.body }}</p>
		<div class="d-flex" v-if="user && user['.key']">
			<img :src="getImageLink" class="mr-2" width="30px" alt="">
			<div class="small">
				<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`">{{ user.bio.name }}</router-link></p>
				<p class="mb-0">{{ getDate }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		data: () => ({
			user: {}
		}),
		props: {
			reply: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getDefaultImage']),
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			getDate(){
				let d = new Date(this.reply.dates.createdAt.seconds * 1000)
				return `on ${d.toDateString()} at ${d.toTimeString().slice(0,5)}`
			}
		},
		async mounted(){
			let doc = await firestore.collection('users').doc(this.reply.userId).get()
			this.user = { '.key': doc.id, ...doc.data() }
		}
	}
</script>