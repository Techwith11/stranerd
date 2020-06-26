<template>
	<div class="container p-2 p-lg-4">
		<div class="alert border d-flex justify-content-between align-items-center" role="alert" v-for="document in course.documents" :key="document.name">
			<span class="font-weight-bold">{{ document.name }}</span>
			<a :href="document.link" download>
				<i class="fas fa-download text-info"></i>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			course: {
				required: true,
				type: Object
			}
		}
	}
</script>