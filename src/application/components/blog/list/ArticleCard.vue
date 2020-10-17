<template>
	<div class="card rounded-xl shadow-sm">
		<img :src="article.image" class="card-img-top" alt="">
		<div class="card-body">
			<p class="small">Published {{ article.createdDate }}</p>
			<router-link :to="`/blog/${article.id}`" class="d-block mb-3 h4 black card-title text-capitalize">{{ article.title }}</router-link>
			<p class="card-text">{{ article.trimmedBody }}</p>
			<p v-if="user.id" class="d-flex align-items-center">
				<span>
					<img :src="user.image" alt="" class="mr-2 border border-dark rounded-circle" width="40" height="40">
					<router-link :to="`/users/${user.id}`" class="bolder text-dark">by {{ user.name }}</router-link>
				</span>
				<span v-if="isAdmin" class="ml-auto d-inline-block">
					<a class="mr-3 text-warning" @click.prevent="openEditModal"><i class="fas fa-pen mr-1"></i>Edit</a>
					<a class="text-danger" @click.prevent="deleteArticle" :disabled="delLoading">
						<loading class="mr-1" v-if="delLoading" />
						<i class="fas mr-1 fa-trash" v-else></i>
						<span>Delete</span>
					</a>
				</span>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { ArticleEntity } from '@modules/blog/domain/entities/article'
import { setCurrentEditingArticle, useDeleteArticle } from '@application/usecases/blog/articles'
import { fetchUser } from '@application/usecases/users/users'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	props: {
		article: {
			required: true,
			type: ArticleEntity
		}
	},
	setup(props){
		const state = reactive({ user: {} as any })
		fetchUser(props.article.userId).then((user) => state.user = user )
		const { loading: delLoading, deleteArticle } = useDeleteArticle(props.article)
		return {
			isAdmin: useStore().auth.isAdmin,
			openEditModal: () => {
				setCurrentEditingArticle(props.article)
				useStore().modals.setEditModalArticle()
			},
			delLoading, deleteArticle,
			user: computed(() => state.user)
		}
	},
})
</script>
