<template>
	<div class="mb-5 white shadow-sm p-3">
		<h5 class="card-title font-weight-bold"><router-link class="text-black-50" :to="`/posts/${post['.key']}`">{{ post.title }}</router-link></h5>
		<p class="card-subtitle mb-2 text-muted small">
			<span class="text-capitalize">{{ post.module }}, </span>
			<span class="text-capitalize">{{ post.subject }}</span>
		</p>
		<p class="card-text">{{ extractedHTML }}</p>
		<router-link :to="`/posts/${post['.key']}`" class="card-link">See all replies</router-link>
		<div class="d-flex align-items-center my-3">
			<img :src="getImageLink" alt="" class="profile-image" id="ownerImage">
			<div>
				<h6 class="mb-0">{{ getName }}</h6>
				<p class="mb-0 small">Posted {{ getCreatedDate }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	import { extractTextFromHTML } from '@/config/formatters'
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
			extractedHTML(){ return extractTextFromHTML(this.post.body) },
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
	img#ownerImage{ width: 40px; height: 40px; }
</style>
