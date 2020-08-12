<template>
	<div class="card my-3">
		<img :src="article.image" class="card-img-top" alt="">
		<div class="card-body">
			<h5 class="card-title">{{ article.title }}</h5>
			<p class="card-text">{{ article.trimmedBody }}</p>
			<span class="d-block my-2">Uploaded {{ article.createdDate }}</span>
			<router-link :to="`/blog/${article.id}`" class="btn btn-primary">View article</router-link>
			<div class="my-3" v-if="isAdmin">
				<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
				<a class="mr-3 text-danger" @click.prevent="deleteArticle" :disabled="delLoading">
					<i class="fas mr-1" :class="delLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
					<span>Delete</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from '@vue/composition-api'
	import { ArticleEntity } from '@root/modules/blog/domain/entities/article'
	import store from '@root/application/store'
	import { useDeleteArticle } from '@root/application/usescases/blog/useArticles'
	export default defineComponent({
		props: {
			article: {
				required: true,
				type: ArticleEntity
			}
		},
		setup(props){
			const { loading: delLoading, deleteArticle } = useDeleteArticle(props.article)
			return {
				isAdmin: computed(() => store.getters.isAdmin),
				openEditModal: () => {
					store.dispatch('setEditMeta', props.article)
					store.dispatch('setEditModalBlog')
				},
				delLoading, deleteArticle
			}
		},
	})
</script>
