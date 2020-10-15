<template>
	<div class="container p-2 p-lg-4">
		<div class="alert border d-flex justify-content-between align-items-center" role="alert"
			v-for="document in course.documents" :key="document.name">
			<span class="font-weight-bold">{{ document.name }}</span>
			<a :href="document.link" target="__blank">
				<i class="fas fa-download text-info"></i>
			</a>
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
