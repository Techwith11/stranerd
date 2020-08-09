<template>
	<div class="d-flex my-3 align-items-end" v-if="user && user['.key']">
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
			<div class="d-flex align-items-center">
				<img :src="getImageLink" class="profile-image" id="ownerImage" alt="">
				<div class="small">
					<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`">{{ user.bio.name }}</router-link></p>
					<p class="mb-0">on {{ reply.createdDate }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { mapGetters, mapActions } from 'vuex'
	import PostEntity from '@root/modules/posts/domain/entities/posts'
	import ReplyEntity from '@root/modules/posts/domain/entities/replies'
	import { useSingleReply } from '@/usescases/posts/replies'
	export default defineComponent({
		data: () => ({isLoading:false}),
		props: {
			reply: {
				required: true,
				type: ReplyEntity
			},
			post: {
				required: true,
				type: PostEntity
			}
		},
		computed: {
			...mapGetters(['getId','getDefaultImage']),
			getImageLink(){ return this.user?.bio?.image?.link ?? this.getDefaultImage },
		},
		setup(props){
			const { loading, user, votes } = useSingleReply(props.post, props.reply)
			return { loading, user, votes }
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
	})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
