<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1>Strive For <span class="font-weight-bold">Progress</span> Not <span class="font-weight-bold">Perfection</span></h1>
				<post-search class="my-2" />
			</div>
		</banner>
		<page-loading v-if="loading"/>
		<div class="container-fluid py-3" v-else>
			<helper-message :message=error v-if="error" />
			<div v-else>
				<div class="grid my-4">
					<div v-for="post in posts" :key="post.id" class="shadow-sm p-3" >
						<post-card :post="post" />
					</div>
				</div>
				<router-link class="floating-button text-white" to="/ask-a-question"><i class="fas fa-plus"></i></router-link>
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
import PostCard from '@application/components/posts/list/PostCard.vue'
import { usePostsList } from '@application/usecases/posts/posts'
import PostSearch from '@application/components/helpers/search/PostSearch.vue'
export default defineComponent({
	name: 'Posts',
	components: {
		'post-card': PostCard,
		'post-search': PostSearch,
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

<style lang="scss" scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
}
@media (min-width: $md) {
  .grid{
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
