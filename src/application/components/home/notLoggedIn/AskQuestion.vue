<template>
	<div id="background" class="py-3 py-md-5">
		<div class="container">
			<div class="row align-items-center justify-content-center flex-column flex-md-row">
				<div class="col-md-4 mb-3 mb-md-0">
					<h2 class="text-center text-gold-dark text-md-right">Ask Your Questions</h2>
				</div>
				<div class="bg-gold-light border border-gold rounded-lg col-md-8">
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
</style>
