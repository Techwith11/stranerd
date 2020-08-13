<template>
	<Default>
		<div class="container my-md-5">
			<article-form :submit="createArticle" :loading="loading" :factory="factory">
				<template slot="title">Create Article</template>
				<template slot="buttonText">Create Article</template>
			</article-form>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useCreateArticle } from '@/usecases/blog/useArticles'
	import ArticleForm from '@/components/blog/ArticleForm.vue'
	export default defineComponent({
		name: 'CreateArticle',
		components: {
			'article-form': ArticleForm
		},
		setup(){
			const { loading, createArticle, factory } = useCreateArticle()
			return {
				loading, createArticle, factory
			}
		}
	})
</script>
