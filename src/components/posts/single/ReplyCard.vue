<template>
	<div class="d-flex my-3 align-items-end">
		<div class="d-flex flex-column align-items-center mr-2">
			<span class="small">{{ votes.length }}</span>
			<span class="small">{{ votes.length === 1 ? 'vote' : 'votes' }}</span>
			<i class="fas fa-spinner fa-spin text-info" v-if="isLoading"></i>
			<div v-if="!isLoading && user['.key'] !== getId">
				<a v-if="votes.includes(user['.key'])" @click.prevent="downvote()"><i class="fas fa-thumbs-down text-danger"></i></a>
				<a v-else @click.prevent="upvote()"><i class="fas fa-thumbs-up text-success"></i></a>
			</div>
		</div>
		<div class="border border-secondary py-1 px-2 rounded flex-grow-1">
			<div v-html="reply.body" class="editor-container"></div>
			<div class="d-flex align-items-center" v-if="user && user['.key']">
				<img :src="getImageLink" class="mr-2" width="40px" alt="">
				<div class="small">
					<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`" target="_blank">{{ user.bio.name }}</router-link></p>
					<p class="mb-0">on {{ getDate }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data: () => ({
			user: {},
			votes: [],
			isLoading: false
		}),
		props: {
			reply: {
				required: true,
				type: Object
			},
			post: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getId','getDefaultImage']),
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			getDate(){
				let date = new Date(this.reply.dates.createdAt.seconds * 1000)
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
			}
		},
		async mounted(){
			let doc = await firestore.collection('users').doc(this.reply.userId).get()
			this.user = { '.key': doc.id, ...doc.data() }
			doc = await firestore.doc(`posts/${this.post['.key']}/replies/${this.reply['.key']}/votes/votes`).get()
			if(doc.exists && doc.data().votes){ this.votes = doc.data().votes }
		},
		methods: {
			...mapActions(['upvoteReply', 'downvoteReply']),
			async upvote() {
				this.isLoading = true
				try{
					let data = {
						post: this.post['.key'],
						reply: this.reply['.key'],
						user: this.user['.key'],
					}
					await this.upvoteReply(data)
					this.votes.push(this.user['.key'])
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
			async downvote(){
				this.isLoading = true
				try{
					let data = {
						post: this.post['.key'],
						reply: this.reply['.key'],
						user: this.user['.key'],
					}
					await this.downvoteReply(data)
					this.votes = this.votes.filter(vote => vote !== this.user['.key'])
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		}
	}
</script>