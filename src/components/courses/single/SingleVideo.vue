<template>
	<div class="container-md p-0 px-md-4">
		<video src="@/assets/videos/test.mp4" class="w-100 mb-0" controls></video>
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
	}
</script>