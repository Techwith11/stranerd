<template>
	<Default>
		<div class="container-fluid py-3">
			<helper-spinner v-if="loading || replyLoading"/>
			<div v-else>
				<post-info :post="post" :user="user" />
				<div class="my-3">
					<p class="text-muted" v-if="replies.length === 0">No replies yet. Consider leaving one</p>
					<div v-else>
						<div class="text-center small text-muted my-2" v-if="hasMore">
							<i class="fas text-info fa-spinner fa-spin mr-1" v-if="olderRepliesLoading"></i>
							<span @click="fetchOlderReplies">Fetch Older Replies</span>
						</div>
						<div class="pl-4">
							<reply-card v-for="reply in replies" :key="reply.id" :reply="reply" :post="post"/>
						</div>
					</div>
				</div>
				<reply-form class="mt-auto" />
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent, onActivated, onDeactivated } from '@vue/composition-api'
	import PostInfo from '@/components/posts/single/PostInfo.vue'
	import ReplyForm from '@/components/posts/single/ReplyForm.vue'
	import ReplyCard from '@/components/posts/single/ReplyCard.vue'
	import router from '@/router'
	import { usePost } from '@/usescases/posts/posts'
	import { useReplies } from '@/usescases/posts/replies'
	export default defineComponent({
		name: "Post",
		setup(){
			const { id } = router.currentRoute.params
			const { post, loading, error, user } = usePost(id)
			const {
				replies, loading: replyLoading, fetched, error: replyError,
				hasMore, olderRepliesLoading, fetchOlderReplies,
				startListener, closeListener,
			} = useReplies(id)
			onActivated(() => fetched.value ? startListener() : null)
			onDeactivated(closeListener)
			return {
				post, loading, error, user,
				replies, replyLoading, fetched, replyError,
				hasMore, olderRepliesLoading, fetchOlderReplies
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
