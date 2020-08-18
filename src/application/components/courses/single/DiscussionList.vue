<template>
	<ul class="list-group list-unstyled" id="scroller" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
		<li class="d-block text-center small text-muted mb-2" v-if="hasMore">
			<i class="fas text-info fa-spinner fa-spin mr-1" v-if="olderDiscussionsLoading"></i>
			<span @click="fetchOlderDiscussions">Fetch Older</span>
		</li>
		<li class="alert alert-warning py-1 border my-1" v-for="discussion in discussions" :key="discussion.id"
		    :class="discussion.userId === getId ? 'ml-auto' : 'mr-auto'">
			<span class="d-block">{{ discussion.body }}</span>
			<small class="small text-black">{{ discussion.createdDate }}</small>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import { useDiscussions } from '@/usecases/courses/disucssion'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import { useStore } from '@/usecases/store'
export default defineComponent({
	props: {
		course: {
			required: true,
			type: CourseEntity
		}
	},
	setup(props) {
		const {
			loading, discussions, hasMore, olderDiscussionsLoading, fetchOlderDiscussions,
			startListener, closeListener, error, fetched
		} = useDiscussions(props.course.id)
		onMounted(() => fetched.value ? startListener() : null)
		onUnmounted(closeListener)
		return {
			loading, discussions, hasMore, olderDiscussionsLoading, fetchOlderDiscussions, error,
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
