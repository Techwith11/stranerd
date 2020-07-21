<template>
	<div class="mb-5 mt-3">
		<div class="d-flex align-items-center mb-2">
			<img :src="getImageLink" alt="" class="mr-2">
			<div>
				<h6 class="mb-0">{{ getName }}</h6>
				<p class="mb-0 small">Posted {{ getCreatedDate }}</p>
			</div>
		</div>
		<router-link class="h5 card-title card-link" :to="`/posts/${post['.key']}`">{{ post.title }}</router-link>
		<p class="card-text" v-html="post.body"></p>
		<p class="card-subtitle mb-2 text-muted small">
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<router-link :to="`/posts/${post['.key']}`" class="card-link">See comments</router-link>
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
			post: {
				required: true,
				type: Object
			}
		},
		async mounted(){
			let doc = await firestore.collection('users').doc(this.post.userId).get()
			this.user = doc.data()
		},
		computed: {
			getName(){ return this.user.bio?.name ?? '' },
			getCreatedDate(){
				let createdAt = this.post.dates.createdAt
				let date = createdAt ? new Date(createdAt.seconds * 1000) : new Date()
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return date.toTimeString().slice(0,5)
				}else if(date > yesterday){
					return 'Yesterday'
				}else{
					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			},
			getImageLink() { return this.user.bio?.image?.link ?? this.getDefaultImage },
			...mapGetters([ 'getDefaultImage' ]),
		}
	}
</script>

<style lang="scss" scoped>
	img{ width: 60px; }
</style>
