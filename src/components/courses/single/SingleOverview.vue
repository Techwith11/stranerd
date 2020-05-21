<template>
	<div class="container">
		<div class="d-flex flex-column">
			<div class="p-2 p-lg-4 rounded-lg my-2 my-lg-4">
				<p class="title font-weight-bold">Description</p>
				<div v-html="course.description" class="mb-4 editor-container"></div>
				<p class="small">
					<span class="font-weight-bold mr-4">Released Date: </span>
					<span>{{ course.dates.createdAt | formatDate }}</span>
				</p>
				<p class="small">
					<span class="font-weight-bold mr-4">Tags: </span>
					<span class="mr-2" v-for="tag in course.tags" :key="tag">
						<i class="fas fa-circle" :class="getColorClass(tag)"></i>
						{{ tag }}
					</span>
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
			formatDate: date => new Date(date.seconds * 1000).toDateString()
		},
		methods:{
			getColorClass(tag){
				let classes = {
					'Physics': 'text-danger',
					'Mathematics': 'text-success',
					'Chemistry': 'text-primary',
				}
				return classes[tag]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/index.scss';
	.title{
		color: $primary-dark;
	}
</style>