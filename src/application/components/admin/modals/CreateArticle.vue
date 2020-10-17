<template>
	<div class="my-md-5">
		<article-form :submit="createArticle" :loading="loading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Create Article</h4>
					<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Create Article</template>
		</article-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateArticle } from '@application/usecases/blog/articles'
import ArticleForm from '@application/components/blog/ArticleForm.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'CreateArticle',
	components: {
		'article-form': ArticleForm
	},
	setup(){
		const { loading, createArticle, factory } = useCreateArticle()
		return {
			loading, createArticle, factory,
			closeCreateModal: useStore().modals.closeCreateModal
		}
	}
})
</script>
