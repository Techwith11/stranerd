<template>
	<div class="card rounded-xl shadow mb-5">
		<img :src="article.image" class="card-img-top" alt="">
		<div class="card-body">
			<p class="small">Published {{ article.createdDate }}</p>
			<router-link :to="`/blog/${article.id}`" class="d-block mb-3 h4 black card-title text-capitalize">{{ article.title }}</router-link>
			<p class="card-text">{{ article.trimmedBody }}</p>
			<p v-if="user.id">
				<img :src="user.image" alt="" class="mr-2 border border-dark rounded-circle" width="40" height="40">
				<router-link :to="`/users/${user.id}`" class="bolder text-black">by {{ user.name }}</router-link>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, reactive } from '@vue/composition-api'
	import { ArticleEntity } from '@root/modules/blog/domain/entities/article'
	import store from '@root/application/store'
	import { useDeleteArticle } from '@root/application/usescases/blog/useArticles'
	import { fetchUser } from '@root/application/usescases/users/users'
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
				isAdmin: computed(() => store.getters.isAdmin),
				openEditModal: () => {
					store.dispatch('setEditMeta', props.article)
					store.dispatch('setEditModalBlog')
				},
				delLoading, deleteArticle,
				user: computed(() => state.user)
			}
		},
	})
</script>
