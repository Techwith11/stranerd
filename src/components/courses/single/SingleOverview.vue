<template>
	<div class="container small">
		<div class="d-flex flex-column-reverse flex-lg-row">
			<div class="col-lg-3 mr-lg-4 p-2 p-lg-4 rounded-lg my-2 my-lg-4 text-center body">
				<p class="title font-weight-bold">Instructor</p>
				<p class="lead font-weight-bold">{{ course.author.name }}</p>
				<p>{{ course.author.bio }}</p>
				<button class="accent-button" @click="$router.push(`/tutors/${course.author.id}`)">Visit profile</button>
			</div>
			<div class="p-2 p-lg-4 rounded-lg my-2 my-lg-4 body">
				<p class="title font-weight-bold">Description</p>
				<p class="mb-5">{{ course.description }}</p>
				<p>
					<span class="font-weight-bold mr-4">Released Date: </span>
					<span>{{ course.created_at | formatDate }}</span>
				</p>
				<p>
					<span class="font-weight-bold mr-4">Tags: </span>
					<span>{{ course.tags | joinTags }}</span>
				</p>
			</div>
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
		},
		filters:{
			joinTags: tags => tags.join(', '),
			formatDate: (date) => new Date(date).toDateString()
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/index.scss';
	.title{
		color: $primary-dark;
	}
	.body{
		border: 1px solid #777777;
	}
	@media screen and (max-width: 991px){
		.body{
			border: none;
		}
	}
</style>