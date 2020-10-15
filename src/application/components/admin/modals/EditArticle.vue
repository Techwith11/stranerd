<template>
	<div class="container my-md-5">
		<article-form :submit="editArticle" :loading="editLoading" :factory="factory">
			<template slot="title">
				<div class="d-flex align-items-baseline justify-content-between my-3">
					<i></i>
					<h4>Edit Article</h4>
					<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
				</div>
			</template>
			<template slot="buttonText">Save Article</template>
		</article-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useEditArticle } from '@application/usecases/blog/articles'
import ArticleForm from '@application/components/blog/ArticleForm.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'EditArticle',
	components: {
		'article-form': ArticleForm
	},
	setup(){
		const { loading: editLoading, editArticle, factory } = useEditArticle()
		return {
			editArticle, factory, editLoading,
			closeEditModal: useStore().modals.closeEditModal
		}
	}
})
</script>
