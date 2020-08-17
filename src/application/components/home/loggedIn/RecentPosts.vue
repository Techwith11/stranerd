<template>
	<div class="p-3 shadow-sm white" v-if="!loading">
		<p class="text-muted txt-shadow">Recent Questions</p>
		<div v-if="error">
			<p class="lead">No questions available at the moment. Try asking one <router-link to="/ask-a-question">here</router-link></p>
		</div>
		<div v-else>
			<post-card v-for="post in posts" :key="post.id" :post="post" />
			<div class="d-flex justify-content-end mb-3">
				<router-link class="txt-shadow text-decoration-none" to="/posts">See More</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useRecentPostsList } from '@/usecases/posts/posts'
import PostCard from '@/components/posts/list/PostCard.vue'
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
