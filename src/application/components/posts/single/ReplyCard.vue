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
    <div class="mt-2 d-flex align-items-center small">
      <span class="mr-3">{{ reply.votesCount }} {{ reply.votesCount === 1 ? 'vote' : 'votes' }}</span>
      <i class="fas fa-spinner fa-spin text-info mr-2" v-if="voting"></i>
      <div v-if="canVote">
        <a v-if="reply.votes[getId]" @click.prevent="downvoteReply" class="text-secondary"><i class="fas fa-thumbs-down mr-1"></i>Remove vote</a>
        <a v-else @click.prevent="upvoteReply" class="text-success"><i class="fas fa-thumbs-up mr-1"></i>Upvote answer</a>
      </div>
    </div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PostEntity } from '@modules/posts/domain/entities/post'
import { ReplyEntity } from '@modules/posts/domain/entities/reply'
import { useSingleReply } from '@application/usecases/posts/replies'
import { useStore } from '@application/usecases/store'
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
			loading, voting, user, canVote,
			upvoteReply, downvoteReply
		} = useSingleReply(props.post.id, props.reply)
		return {
			loading, voting, user, upvoteReply, downvoteReply, canVote,
			getId: useStore().auth.getId
		}
	}
})
</script>

<style lang="scss" scoped>
	img#ownerImage{ width: 40px; height: 40px; }
</style>
