<template>
	<Default>
    <helper-spinner v-if="loading || replyLoading"/>
   <div v-else>
     <banner>
       <post-info :post="post" :user="user" />
     </banner>
     <div class="container my-4 ">
       <div class="mx-auto" style="max-width: 75ch;">
         <div class="shadow-sm p-3 rounded-xl">
           <div v-html="post && post.body" class="lead editor-container"></div>
         </div>
         <hr class="my-4">
         <div class="mb-3">
           <h5 class="text-muted mb-3">Answers</h5>
           <p class="text-muted" v-if="replies.length === 0">No answers found for this question. Consider leaving one</p>
           <div v-else>
             <reply-card v-for="reply in replies" :key="reply.id" :reply="reply" :post="post"/>
           </div>
         </div>
         <reply-form class="mt-auto" />
       </div>
     </div>
   </div>
	</Default>
</template>W

<script lang="ts">
import { defineComponent, onUnmounted } from '@vue/composition-api'
import PostInfo from '@application/components/posts/single/PostInfo.vue'
import ReplyForm from '@application/components/posts/single/ReplyForm.vue'
import ReplyCard from '@application/components/posts/single/ReplyCard.vue'
import router from '@application/router'
import { usePost } from '@application/usecases/posts/posts'
import { useReplies } from '@application/usecases/posts/replies'
export default defineComponent({
	name: 'Post',
	setup(){
		const { id } = router.currentRoute.params
		const { post, loading, error, user } = usePost(id)
		const { replies, loading: replyLoading, error: replyError, closeListener, } = useReplies(id)
		onUnmounted(closeListener)
		return {
			post, loading, error, user,
			replies, replyLoading, replyError
		}
	},
	components: {
		'post-info': PostInfo,
		'reply-form': ReplyForm,
		'reply-card': ReplyCard,
	},
	meta(){
		return {
			title: (this.post as any)?.title || 'Question Title',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: ''
				},
				{
					vmid: 'author',
					name: 'author',
					content: (this.user as any)?.name ?? 'user'
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: [
							(this.post as any)?.module,
							(this.post as any)?.subject,
							(this.post as any)?.title
					].join(', ')
				}
			]
		}
	}
})
</script>
