<template>
	<div class="card my-3">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-subtitle mb-2 text-muted small">
				<span class="text-capitalize">{{ post.module }}, </span>
				<span class="text-capitalize">{{ post.subject }}</span>
			</p>
			<div class="d-flex justify-content-end">
				<router-link :to="`/posts/${post['.key']}`" class="card-link btn btn-outline-primary">See Question & Replies</router-link>
			</div>
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