<template>
	<Default>
		<helper-spinner v-if="loading"/>
		<div class="container-fluid py-3" v-else>
			<helper-message :message=error v-if="error" />
			<div v-else>
				<post-card v-for="post in posts" :key="post.id" :post="post" />
				<div class="text-center small text-muted mb-2" v-if="hasMore">
					<i class="fas text-info fa-spinner fa-spin mr-1" v-if="olderPostsLoading"></i>
					<span @click="fetchOlderPosts">Fetch Older</span>
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import HelperSpinner from '@/components/helpers/Spinner.vue'
    import HelperMessage from '@/components/helpers/Message.vue'
    import PostCard from '@/components/posts/list/PostCard.vue'
    import { usePostsList } from '@/usescases/posts/posts'
	export default defineComponent({
        name: 'Posts',
        components: {
            'helper-spinner': HelperSpinner,
            'helper-message': HelperMessage,
            'post-card': PostCard,
        },
		setup(){
            const {
                loading, olderPostsLoading, hasMore, error,
				posts, fetchOlderPosts
            } =  usePostsList()
			return {
                loading, olderPostsLoading, hasMore, error,
                posts, fetchOlderPosts
			}
		},
        meta(){
            return {
                title: 'Recent Questions',
                meta: [
                    {
                        vmid: 'description',
                        name: 'description',
                        content: ''
                    },
                    {
                        vmid: 'keywords',
                        name: 'keywords',
                        content: [].join(', ')
                    }
                ]
            }
        }
	})
</script>
