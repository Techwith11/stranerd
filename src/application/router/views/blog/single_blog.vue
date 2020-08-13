<template>
	<Default>
		<helper-spinner v-if="loading"/>
		<div v-else>
			<article-info :article="article" :user="user" />
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import ArticleInfo from '@/components/blog/single/ArticleInfo.vue'
	import { useSingleArticle } from '@/usecases/blog/useArticles'
	import router from '@/router'
	export default defineComponent({
		name: 'Article',
		setup(){
			const { id } = router.currentRoute.params
			const { loading, article, user, error } = useSingleArticle(id)
			return { loading, article, user, error }
		},
		components: {
			'article-info': ArticleInfo
		},
		meta(){
			return {
				title: (this.article as any)?.title || 'Title',
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
