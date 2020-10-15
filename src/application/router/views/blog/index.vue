<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1 class="mx-auto my-5" style="max-width: 400px;">Stay up to date with the latest from Stranerd</h1>
				<article-search class="my-2" />
			</div>
		</banner>
		<page-loading v-if="loading"/>
		<div v-else class="px-2 my-4">
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
			<button class="floating-button" v-if="isAdmin" @click="setCreateModalArticle">
				<i class="fas fa-plus text-white"></i>
			</button>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ArticleCard from '@application/components/blog/list/ArticleCard.vue'
import { useArticlesList } from '@application/usecases/blog/articles'
import { useStore } from '@application/usecases/store'
import ArticleSearch from '@application/components/helpers/search/ArticleSearch.vue'
export default defineComponent({
	name: 'Posts',
	components: {
		'article-card': ArticleCard,
		'article-search': ArticleSearch,
	},
	setup(){
		const { loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles } = useArticlesList()
		return {
			loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles,
			isAdmin: useStore().auth.isAdmin,
			setCreateModalArticle: useStore().modals.setCreateModalArticle
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
