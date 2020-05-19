<template>
	<div class="card my-3">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-text">{{ post.body }}</p>
			<p class="card-subtitle mb-2 text-muted small">
				<span v-for="tag in post.tags" :key="tag" class="mr-2"><i class="text-info fas fa-circle mr-1"></i>{{ tag }}</span>
			</p>
			<router-link :to="`/posts/${post['.key']}`" class="card-link">See Replies</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			post: {
				required: true,
				type: Object
			}
		}
	}
</script>