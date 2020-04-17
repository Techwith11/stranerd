<template>
	<router-link class="card my-3 text-decoration-none" :to="`/courses/${course['.key']}`">
		<img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
		<div class="card-body">
			<h6 class="card-title">Become A Social Media Expert</h6>
			<p class="small">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<p>{{ course.tags }}</p>
		</div>
	</router-link>
</template>

<script>
    export default {
        props: {
            course: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '../../../style/index';
	.router-link-exact-active{
		background: $primary;
		color: $white;
	}
	.card-body{
		background: $gradient;
		color: $white;
	}
</style>


