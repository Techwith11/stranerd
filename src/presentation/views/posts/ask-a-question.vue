<template>
	<Default>
		<div class="container py-5">
			<h3 class="text-center mb-4">Ask A Question</h3>
			<create-post />
		</div>
	</Default>
</template>


<script>
	import CreatePost from '@/components/posts/CreatePost'
	export default {
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
	}
</script>
