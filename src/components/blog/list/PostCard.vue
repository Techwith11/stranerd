<template>
	<div class="card my-3">
		<img :src="post.image.link" class="card-img-top" alt="">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-text">{{ post.description }}</p>
			<p class="small"><span class="mr-2" v-for="tag in post.tags" :key="tag">{{ tag }}</span></p>
			<span class="d-block my-2">{{ post.dates.createdAt }}</span>
			<router-link :to="`/blog/${post['.key']}`" class="btn btn-primary">View article</router-link>
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