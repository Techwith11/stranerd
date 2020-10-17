<template>
	<div class="p-3 shadow white" v-if="!loading">
		<p class="text-muted txt-shadow">Recent Questions</p>
		<div v-if="error">
			<p class="lead">No questions available at the moment. Try asking one <router-link to="/ask-a-question">here</router-link></p>
		</div>
		<div v-else>
			<div v-for="post in posts" :key="post.id">
				<post-card  :post="post" />
				<hr class="mt-2 mb-5">
			</div>
			<div class="d-flex justify-content-end mb-3">
				<router-link class="txt-shadow text-decoration-none" to="/posts">See More</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useRecentPostsList } from '@application/usecases/posts/posts'
import PostCard from '@application/components/posts/list/PostCard.vue'
export default defineComponent({
	components: {
		'post-card': PostCard
	},
	setup(){
		const { loading, error, posts } = useRecentPostsList()
		return { loading, error, posts }
	}
})
</script>
