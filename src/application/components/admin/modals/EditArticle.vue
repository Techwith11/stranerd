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
			<template slot="buttonText">Edit Article</template>
		</article-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useEditArticle } from '@/usecases/blog/useArticles'
import ArticleForm from '@/components/blog/ArticleForm.vue'
import store from '@/store'
export default defineComponent({
	name: 'EditArticle',
	components: {
		'article-form': ArticleForm
	},
	setup(){
		const { loading: editLoading, editArticle, factory } = useEditArticle()
		return {
			editArticle, factory, editLoading,
			closeEditModal: () => store.dispatch('closeEditModal')
		}
	}
})
</script>
