<template>
	<div class="d-flex my-3 align-items-end" v-if="!loading">
		<div class="d-flex flex-column align-items-center mr-2">
			<span class="small">{{ votes }}</span>
			<span class="small">{{ votes === 1 ? 'vote' : 'votes' }}</span>
			<i class="fas fa-spinner fa-spin text-info" v-if="voting"></i>
			<div v-if="canVote">
				<a v-if="hasVoted" @click.prevent="downvoteReply"><i class="fas fa-thumbs-down text-danger"></i></a>
				<a v-else @click.prevent="upvoteReply"><i class="fas fa-thumbs-up text-success"></i></a>
			</div>
		</div>
		<div class="border border-secondary py-1 px-2 rounded flex-grow-1">
			<div v-html="reply.body" class="editor-container"></div>
			<div class="d-flex align-items-center">
				<img :src="user.image" class="profile-image" id="ownerImage" alt="">
				<div class="small">
					<p class="mb-0">Posted by <router-link class="text-info" :to="`/users/${user['.key']}`">{{ user.name }}</router-link></p>
					<p class="mb-0">on {{ reply.createdDate }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import PostEntity from '@root/modules/posts/domain/entities/post'
	import ReplyEntity from '@root/modules/posts/domain/entities/reply'
	import { useSingleReply } from '@/usescases/posts/replies'
	export default defineComponent({
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
		setup(props){
			const {
				loading, voting, user, votes, hasVoted, canVote,
				upvoteReply, downvoteReply
			} = useSingleReply(props.post.id, props.reply)
			return { loading, voting, user, votes, hasVoted, canVote, upvoteReply, downvoteReply }
		}
	})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
