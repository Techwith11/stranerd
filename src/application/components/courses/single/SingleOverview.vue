<template>
	<div class="container">
		<div class="d-flex flex-column">
			<div class="p-2 p-lg-4 rounded-lg my-2 my-lg-4">
				<p class="title font-weight-bold">Description</p>
				<div v-html="course.description" class="mb-4 editor-container"></div>
				<p class="small">
					<span class="font-weight-bold mr-4">Released Date: </span>
					<span>{{ course.createdDate }}</span>
				</p>
				<p class="small font-weight-bold text-capitalize">{{ course.subject }} : {{ course.module }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseEntity } from '@modules/courses/domain/entities/course'
export default defineComponent({
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	}
})
</script>

<style lang="scss" scoped>
	.title{
		color: $primary-dark;
	}
</style>
