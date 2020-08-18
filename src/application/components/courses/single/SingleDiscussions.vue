<template>
	<div class="container small p-2 p-lg-4">
		<div v-if="isSubscribed">
			<discussion-list :course="course" />
			<discussion-form :course="course" />
		</div>
		<p v-else>
			<span>You need an active subscription to gain access to this course's discussions. </span>
			<router-link to="/pricing-plans">Subscribe Now</router-link>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import store from '@/store'
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
	},
	setup(){
		return {
			isSubscribed: computed(() => store.getters.isSubscribed)
		}
	}
})
</script>

<style lang="scss" scoped>
	.container{
		max-height: 100vh;
	}
</style>
