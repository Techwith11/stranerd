<template>
	<Default>
		<div class="container py-5">
			<h3 class="text-center mb-4">Ask A Question</h3>
			<create-post />
		</div>
	</Default>
</template>


<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import CreatePost from '@/components/posts/PostForm.vue'
	export default defineComponent({
		name: 'AskAQuestion',
		components: {
			'create-post': CreatePost
		},
		meta(){
			return {
				title: 'Ask A Question',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	})
</script>
