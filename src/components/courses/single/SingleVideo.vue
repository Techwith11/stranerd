<template>
	<div class="container-md p-0 px-md-4">
		<div class="position-relative">
			<video :src="getVideoLink" class="w-100 mb-0" controls></video>
			<i class="position-absolute fas fa-crown fa-2x text-danger" v-if="course.premium"></i>
		</div>
		<h6 class="text-center">{{ course.title }}</h6>
	</div>
</template>

<script>
	export default {
		props: {
			course: {
				required: true,
				type: Object
			}
		},
		computed: {
			getVideoLink(){ return this.course.premium ? this.course.preview.link : this.course.video.link }
		}
	}
</script>

<style>
	i{
		z-index: 3;
		right: 0;
		top: 0;
		padding: 0.5rem;
	}
</style>