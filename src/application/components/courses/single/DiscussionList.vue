<template>
	<ul class="list-group list-unstyled" id="scroller" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
		<li class="alert alert-warning py-1 border my-1" v-for="discussion in discussions" :key="discussion.id"
		    :class="discussion.userId === getId ? 'ml-auto' : 'mr-auto'">
			<span class="d-block">{{ discussion.body }}</span>
			<small class="small text-dark">{{ discussion.createdDate }}</small>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from '@vue/composition-api'
import { useDiscussions } from '@/usecases/courses/discussion'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { useStore } from '@/usecases/store'
export default defineComponent({
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	},
	setup(props) {
		const { loading, discussions, closeListener, error } = useDiscussions(props.course.id)
		onUnmounted(closeListener)
		return {
			loading, discussions, error,
			getId: useStore().auth.getId
		}
	}
})
</script>

<style lang="scss" scoped>
	.alert{
		max-width: 75%;
		min-width: 20%;
	}
	#scroller{
		height: 40vh;
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
</style>
