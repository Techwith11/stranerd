<template>
	<Default>
		<helper-spinner v-if="loading"/>
		<div v-else class="container py-3">
			<helper-message :message="error" v-if="error" />
			<div v-else>
				<div class="grid">
					<article-card v-for="article in articles" :article="article" :key="article.id" />
				</div>
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderArticles">
						<i class="fas fa-spinner fa-spin mr-2" v-if="olderArticlesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
			<button class="floating-button" v-if="isAdmin" @click="setCreateModalBlog">
				<i class="fas fa-plus text-white"></i>
			</button>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import ArticleCard from '@/components/blog/list/ArticleCard.vue'
import { useArticlesList } from '@/usecases/blog/useArticles'
import store from '@root/application/store'
export default defineComponent({
	name: 'Posts',
	components: {
		'article-card': ArticleCard
	},
	setup(){
		const { loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles } = useArticlesList()
		return {
			loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles,
			isAdmin: computed(() => store.getters.isAdmin),
			setCreateModalBlog: () => store.dispatch('setCreateModalBlog')
		}
	},
	meta(){
		return {
			title: 'Stranerd Blog',
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
		grid-row-gap: 1rem;
	}
	@media (min-width: $lg) {
		.grid{
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
