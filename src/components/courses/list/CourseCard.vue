<template>
	<router-link class="card my-3 text-decoration-none" :to="`/courses/${course['.key']}`">
		<img :src="course.image.link" class="card-img-top" alt="">
		<div class="card-body">
			<h6 class="card-title">{{ course.title }}</h6>
			<p class="small">{{ course.description }}</p>
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


