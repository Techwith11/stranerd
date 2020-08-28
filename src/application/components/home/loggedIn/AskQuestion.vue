<template>
	<div class="p-3 white shadow">
		<p class="text-muted">Ask a Question</p>
		<create-post />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreatePost from '@/components/posts/PostForm.vue'
export default defineComponent({
	components: {
		'create-post': CreatePost
	}
})
</script>
