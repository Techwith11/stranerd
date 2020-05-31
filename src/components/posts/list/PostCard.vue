<template>
	<div class="card my-3">
		<div class="card-body">
			<h5 class="card-title">{{ post.title }}</h5>
			<p class="card-subtitle mb-2 text-muted small">
				<span v-for="tag in post.tags" :key="tag" class="mr-2"><i class="fas fa-circle mr-1" :class="getRandomColor()"></i>{{ tag }}</span>
			</p>
			<router-link :to="`/posts/${post['.key']}`" class="card-link" target="_blank">See Question & Replies</router-link>
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
		},
		methods: {
			getRandomColor(){
				let colors = [
					'text-primary','text-secondary','text-success','text-danger',
					'text-warning','text-info','text-dark',
				]
				return colors[Math.floor(Math.random() * colors.length)]
			}
		}
	}
</script>