<template>
	<div class="container-md p-0 px-md-4 pt-1">
		<video :src="getVideoLink" class="w-100 mb-0" controls></video>
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
			getVideoLink(){ return this.course.video.link }
		}
	}
</script>