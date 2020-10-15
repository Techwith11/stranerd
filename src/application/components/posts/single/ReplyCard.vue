<template>
	<div class="mb-4 shadow-sm p-3 rounded-xl" v-if="!loading">
		<div class="d-flex align-items-center mb-2">
			<img :src="user.image" class="profile-image" id="ownerImage" alt="">
			<div class="small">
				<p class="mb-0"><router-link class="text-dark" :to="`/users/${user.id}`">{{ user.name }}</router-link></p>
				<p class="mb-0">on {{ reply.createdDate }}</p>
			</div>
		</div>
		<div v-html="reply.body" class="editor-container"></div>
		<div>
			<div class="my-2 d-flex align-items-center small">
				<button class="btn btn-success flex-grow-1 mr-2" @click.prevent="likeReply" :disabled="cannotLike">Like</button>
				<button class="btn btn-danger flex-grow-1" @click.prevent="dislikeReply" :disabled="cannotDislike">Dislike</button>
			</div>
			<div>
				<span class="mr-2" v-if="reply.likesCount">{{ reply.likesCount }} {{ reply.likesCount === 1 ? 'like' : 'likes' }}</span>
				<span class="mr-2" v-if="reply.dislikesCount">{{ reply.dislikesCount }} {{ reply.dislikesCount === 1 ? 'dislike' : 'dislikes' }}</span>
				<i class="fas fa-spinner fa-spin text-info mr-2" v-if="liking"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PostEntity } from '@modules/posts/domain/entities/post'
import { ReplyEntity } from '@modules/posts/domain/entities/reply'
import { useSingleReply } from '@application/usecases/posts/replies'
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
			loading, user, liking, cannotLike, cannotDislike,
			likeReply, dislikeReply
		} = useSingleReply(props.post.id, props.reply)
		return {
			loading, user, liking, likeReply, dislikeReply,
			cannotLike, cannotDislike
		}
	}
})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
