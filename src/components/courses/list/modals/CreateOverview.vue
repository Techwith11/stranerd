<template>
	<div class="text-center m-md-5">
		<div class="d-flex justify-content-between align-items-center my-3">
			<i></i>
			<h3 class="mb-0">Create Content</h3>
			<i class="fas fa-times fa-2x text-danger" @click="closeCreateModal"></i>
		</div>
		<div class="d-flex flex-column mx-2 align-items-center">
			<button @click="setCreateModalCourse">Create Course</button>
			<button @click="setCreateModalQuestion">Create Question</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: "CreateOverview",
		methods: {
			...mapActions(['setCreateModalQuestion','setCreateModalCourse','closeCreateModal']),
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../style/index';
	button{
		margin: 0.5rem 0;
		color: $text-black;
		border: 1px solid #333333;
		display: block;
		min-width: 300px;
	}
</style>