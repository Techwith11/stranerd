import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddDiscussion, GetDiscussions, GetDiscussionFactory, ListenToDiscussions } from '@root/modules/courses'
import { Notify } from '@/config/notifications'
import { useStore } from '@/usecases/store'

const PAGINATION_LIMIT = process.env.VUE_APP_PAGINATION_LIMIT
const discussionsGlobalState: { [key: string]: {
		fetched: boolean,
		loading: boolean,
		error: string,
		discussions: DiscussionEntity[],
		hasMore: boolean,
		olderDiscussionsLoading: boolean,
		listener: () => void
} } = {}

const fetchDiscussions = async (courseId: string) => {
	const courseDiscussions = discussionsGlobalState[courseId].discussions
	const lastIndex = courseDiscussions.length - 1
	const date = courseDiscussions[lastIndex]?.createdAt
	const entities = await GetDiscussions.call(courseId, date)
	discussionsGlobalState[courseId].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach((entity) => {
		const index = discussionsGlobalState[courseId].discussions.findIndex((e) => e.id === entity.id)
		index !== -1 ? discussionsGlobalState[courseId].discussions[index] = entity : discussionsGlobalState[courseId].discussions.unshift(entity)
	})
}

const startListener = async (courseId: string) => {
	const courseDiscussions = discussionsGlobalState[courseId].discussions
	const lastIndex = courseDiscussions.length - 1
	const date = courseDiscussions[lastIndex]?.createdAt
	const addDiscussions = (entities: DiscussionEntity[]) => {
		entities.forEach((entity) => {
			const index = discussionsGlobalState[courseId].discussions.findIndex((e) => e.id === entity.id)
			index !== -1 ? discussionsGlobalState[courseId].discussions[index] = entity : discussionsGlobalState[courseId].discussions.push(entity)
		})
	}
	discussionsGlobalState[courseId].listener = await ListenToDiscussions.call(courseId, addDiscussions, date)
}

export const useDiscussions = (courseId: string) => {
	if(discussionsGlobalState[courseId] === undefined){
		discussionsGlobalState[courseId] = reactive({
			fetched: false,
			loading: false,
			discussions: [] as DiscussionEntity[],
			error: '',
			hasMore: false,
			olderDiscussionsLoading: false,
			listener: () => {},
		})
	}

	const fetchDiscussionsAndStartListenerOnInit = async () => {
		discussionsGlobalState[courseId].loading = true
		if(!discussionsGlobalState[courseId].fetched){
			await fetchDiscussions(courseId).catch(() => discussionsGlobalState[courseId].error = 'Error fetching discussions')
			discussionsGlobalState[courseId].fetched = true
		}
		await startListener(courseId).catch(() => discussionsGlobalState[courseId].error = 'Error starting listener')
		discussionsGlobalState[courseId].loading = false
	}
	const fetchOlderDiscussions = async () => {
		discussionsGlobalState[courseId].olderDiscussionsLoading = true
		await fetchDiscussions(courseId).catch(() => discussionsGlobalState[courseId].error = 'Error fetching older discussions')
		discussionsGlobalState[courseId].olderDiscussionsLoading = false
	}

	fetchDiscussionsAndStartListenerOnInit().catch(() => discussionsGlobalState[courseId].error = 'Unknown error')

	return {
		fetched: computed(() => discussionsGlobalState[courseId].fetched),
		loading: computed(() => discussionsGlobalState[courseId].loading),
		error: computed(() => discussionsGlobalState[courseId].error),
		discussions: computed(() => discussionsGlobalState[courseId].discussions),
		hasMore: computed(() => discussionsGlobalState[courseId].hasMore),
		olderDiscussionsLoading: computed(() => discussionsGlobalState[courseId].olderDiscussionsLoading),

		fetchOlderDiscussions,
		startListener: () => startListener(courseId),
		closeListener: () => discussionsGlobalState[courseId].listener()
	}
}

export const useCreateDiscussion = (courseId: string) => {
	const state = reactive({
		loading: false,
		factory: GetDiscussionFactory.call()
	})
	state.factory.userId = useStore().auth.getId.value

	const createDiscussion = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try {
				await AddDiscussion.call(courseId, state.factory)
				state.factory.reset()
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	watch(() => useStore().auth.getId, () => state.factory.userId = useStore().auth.getId.value)

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		createDiscussion
	}
}
