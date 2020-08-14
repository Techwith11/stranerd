<template>
	<div class="p-3 white shadow-sm">
		<p class="text-muted">Ask a Question</p>
		<create-post />
	</div>
</template>

<script>
	import CreatePost from '@/components/posts/PostForm'
	export default {
		components: {
			'create-post': CreatePost
		}
	}
</script>
