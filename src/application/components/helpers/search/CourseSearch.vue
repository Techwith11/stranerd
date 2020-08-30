<template>
	<search collection="courses" :transformResults="transformResults">
		<template v-slot:item="{ item }">
			<div class="text-dark small">
				<h6 class="mb-0 text-truncate">
					<router-link :to="`/courses/${item.course.subject}/${item.course.module}/${item.course.id}`" class="card-link">
						<ais-highlight :hit="item" attribute="title" />
					</router-link>
				</h6>
				<p class="mb-0">{{ item.course.description }}</p>
				<p class="mb-0 text-muted text-capitalize">{{ item.course.subject }} - {{ item.course.module }}</p>
			</div>
		</template>
	</search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseFromModel } from '@root/modules/courses/data/models/course'
import { extractTextFromHTML, trimToLength } from '@root/modules/core/validations/sanitizers'
export default defineComponent({
	setup(){
		return {
			transformResults: (items: any[]) => items
				.map((item) => {
					const { objectID: id, title, description, subject, module } = item as CourseFromModel & { objectID: string }
					item.course = { id, title, description: trimToLength(extractTextFromHTML(description), 50), subject, module }
					return item
				})
		}
	}
})
</script>
