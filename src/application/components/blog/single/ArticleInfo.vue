<template>
	<div>
		<div id="image" :style="{background: `url('${article.image}')`}">
			<div class="overlay">
				<div class="container text-center">
					<h1 class="title">{{ article.title }}</h1>
					<p>{{ article.createdDate }}</p>
					<img :src="user.image" alt="" width="50" height="50" class="rounded-circle border border-secondary">
					<h6>{{ user.name }}</h6>
					<span v-if="isAdmin" class="d-inline-block">
						<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
						<a class="text-danger" @click.prevent="deleteArticle" :disabled="delLoading">
							<i class="fas mr-1" :class="delLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
							<span>Delete</span>
						</a>
					</span>
				</div>
			</div>
		</div>
		<div class="container py-5">
			<div v-html="article.body" class="editor-container lead"></div>
			<p class="my-3 text-muted">Tags: {{ tags }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { setCurrentEditingArticle, useDeleteArticle } from '@/usecases/blog/articles'
import { ArticleEntity } from '@root/modules/blog/domain/entities/article'
import store from '@/store'
import { capitalizeText } from '@root/modules/core/validations/sanitizers'
import { UserEntity } from '@root/modules/users/domain/entities/user'
export default defineComponent({
	props: {
		article: {
			required: true,
			type: ArticleEntity
		},
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup(props){
		const { loading: delLoading, deleteArticle } = useDeleteArticle(props.article)
		return {
			isAdmin: computed(() => store.getters.isAdmin),
			openEditModal: () => {
				setCurrentEditingArticle(props.article)
				store.dispatch('setEditModalBlog')
			},
			delLoading, deleteArticle,
			tags: computed(() => props.article.tags.map(capitalizeText).join(', '))
		}
	}
})
</script>

<style lang="scss" scoped>
	div#image{
		.overlay{
			background: $blackTransparent;
			color: $white;
			padding: 4rem 0;
			min-height: 60vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		h1.title{
			font-size: 2.25rem;
			margin: 1.25rem 0;
		}
		img{ margin: 3rem 0 0; }
		h6{ margin: 1rem 0; }
		@media (min-width: $md){
			h1.title{ font-size: 3.5rem; }
		}
		@media (min-width: $lg){
			h1.title{ font-size: 4.5rem; }
		}
	}
</style>
