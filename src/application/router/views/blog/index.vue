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
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import ArticleCard from '@/components/blog/list/ArticleCard.vue'
	import { useArticlesList } from '@/usescases/blog/useArticles'
	import { EventBus } from '@root/application/config/events'
	export default defineComponent({
		name: 'Posts',
		components: {
			'article-card': ArticleCard
		},
		setup(){
			const { loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles } = useArticlesList()
			return { loading, olderArticlesLoading, hasMore, error, articles, fetchOlderArticles }
		},
		async mounted(){
			EventBus.$on('BlogPostEdited', article => {
				let index = this.articles.findIndex(p => p['.key'] === article['.key'])
				this.articles[index] = article
				this.$forceUpdate()
			})
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
		grid-column-gap: 0.5rem;
		grid-row-gap: 0.5rem;
	}
	@media (min-width: $md) {
		.grid{
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
