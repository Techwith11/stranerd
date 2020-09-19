<template>
	<div class="container small p-2 p-lg-4">
		<discussion-list :course="course" />
		<discussion-form :course="course" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import DiscussionList from '@/components/courses/single/DiscussionList.vue'
import DiscussionForm from '@/components/courses/single/DiscussionForm.vue'
export default defineComponent({
	components: {
		'discussion-list': DiscussionList,
		'discussion-form': DiscussionForm
	},
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	}
})
</script>

<style lang="scss" scoped>
	.container{
		max-height: 100vh;
	}
</style>
