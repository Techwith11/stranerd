<template>
	<router-link class="card my-3 text-decoration-none" :to="`/courses/${course['.key']}`">
		<img :src="course.image.link" class="card-img-top" alt="">
		<div class="card-body">
			<h6 class="card-title">{{ course.title }}</h6>
			<div v-html="course.description"  class="small editor-container"></div>
			<p class="small">
				<span class="mr-2" v-for="tag in course.tags" :key="tag">
					<i class="fas fa-circle" :class="getColorClass(tag)"></i>
					{{ tag }}
				</span>
			</p>
			<p class="small">Updated: {{ course.dates.updatedAt | getDate }}</p>
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
        },
		filters: {
			getDate(date){
				return new Date(date.seconds * 1000).toDateString()
			}
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
