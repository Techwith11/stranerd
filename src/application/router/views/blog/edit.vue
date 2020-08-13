<template>
	<Default>
		<div class="container my-md-5">
			<helper-spinner v-if="loading" />
			<article-form v-else :submit="editArticle" :loading="editLoading" :factory="factory">
				<template slot="title">Edit Article</template>
				<template slot="buttonText">Edit Article</template>
			</article-form>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent, watch } from '@vue/composition-api'
	import { useEditArticle, useSingleArticle } from '@/usecases/blog/useArticles'
	import ArticleForm from '@/components/blog/ArticleForm.vue'
	import router from '@/router'
	export default defineComponent({
		name: 'EditArticle',
		components: {
			'article-form': ArticleForm
		},
		setup(){
			const { id } = router.currentRoute.params
			const { loading, article, error } = useSingleArticle(id)
			const { loading: editLoading, editArticle, factory } = useEditArticle()
			watch(() => article.value, () => {
				if(article.value?.id) factory.loadEntity(article.value)
			})
			return {
				loading, error,
				editArticle, factory, editLoading
			}
		}
	})
</script>
