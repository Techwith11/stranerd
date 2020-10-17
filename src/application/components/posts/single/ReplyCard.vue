<template>
	<div class="mb-5" v-if="!loading">
		<div class="d-flex align-items-start mb-2">
			<img :src="user.image" class="profile-image" id="ownerImage" alt="">
			<div class="flex-grow-1">
				<div class="small">
					<p class="mb-0"><router-link class="text-dark" :to="`/users/${user.id}`">{{ user.name }}</router-link></p>
					<p class="mb-0">on {{ reply.createdDate }}</p>
				</div>
				<div class="shadow-sm rounded p-3">
					<div v-html="reply.body" class="editor-container"></div>
				</div>
				<div>
					<div class="d-flex align-items-center small">
						<button class="btn btn-success shadow-sm flex-grow-1 rounded-0 text-wrap" @click.prevent="likeReply" :disabled="cannotLike">
							{{ reply.likesCount }} {{ reply.likesCount === 1 ? 'Like' : 'Likes' }}
						</button>
						<button class="btn btn-danger shadow-sm flex-grow-1 rounded-0 text-wrap" @click.prevent="dislikeReply" :disabled="cannotDislike">
							{{ reply.dislikesCount }} {{ reply.dislikesCount === 1 ? 'Unlike' : 'Unlikes' }}
						</button>
					</div>
					<loading class="mr-2" v-if="liking" />
				</div>
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
