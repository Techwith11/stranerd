<template>
	<div id="background" class="p-2 p-md-5">
		<div class="container">
			<div class="row align-items-center justify-content-center flex-column flex-md-row">
				<div class="col-md-4 mb-3 mb-md-0">
					<h1 class="text-muted text-center">Ask Your Questions</h1>
				</div>
				<div class="col-md-8 border border-secondary bg-white px-3 rounded-lg">
					<create-post />
				</div>
			</div>
		</div>
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

<style lang="scss" scoped>
	#background{
		background: url('../../../assets/images/ask_questions_background.svg');
		background-size: cover;
	}
	#bg-primary{
		background: $primary-dark;
		color: $white;
	}
</style>
