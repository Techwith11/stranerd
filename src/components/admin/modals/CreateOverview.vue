<template>
	<div class="text-center m-md-5">
		<div class="d-flex justify-content-between align-items-center my-3">
			<i></i>
			<h3 class="mb-0">Create Content</h3>
			<a @click.prevent="closeCreateModal"><i class="fas fa-times fa-2x text-danger"></i></a>
		</div>
		<div class="d-flex flex-column mx-2 align-items-center">
			<button class="btn-success" @click="setCreateModalCourse">Create Course</button>
			<button class="btn-success" @click="setCreateModalQuestion">Create Question</button>
			<button class="btn-success" @click="setCreateModalNote">Upload Note to Shop</button>
			<button class="btn-success" @click="setCreateModalBlog">Create Blog Post</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: "CreateOverview",
		methods: {
			...mapActions(['setCreateModalQuestion','setCreateModalCourse','setCreateModalNote','setCreateModalBlog','closeCreateModal']),
		}
	}
</script>

<style lang="scss" scoped>
	button{
		margin: 0.5rem 0;
		border: 1px solid #333333;
		display: block;
		min-width: 300px;
	}
</style>