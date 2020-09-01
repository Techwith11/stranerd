import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddDiscussion, GetDiscussionFactory, ListenToDiscussions } from '@root/modules/courses'
import { Notify } from '@/config/notifications'
import { useStore } from '@/usecases/store'

const discussionsGlobalState: { [key: string]: {
	loading: boolean,
	error: string,
	discussions: DiscussionEntity[],
	listener: () => void
} } = {}


const startListener = async (courseId: string) => {
	const addDiscussions = (entities: DiscussionEntity[]) => discussionsGlobalState[courseId].discussions = entities
	discussionsGlobalState[courseId].listener = await ListenToDiscussions.call(courseId, addDiscussions)
}

export const useDiscussions = (courseId: string) => {
	if(discussionsGlobalState[courseId] === undefined){
		discussionsGlobalState[courseId] = reactive({
			loading: false,
			discussions: [] as DiscussionEntity[],
			error: '',
			listener: () => {},
		})
	}

	const startListenerOnInit = async () => {
		discussionsGlobalState[courseId].loading = true
		await startListener(courseId).catch(() => discussionsGlobalState[courseId].error = 'Error starting listener')
		discussionsGlobalState[courseId].loading = false
	}

	startListenerOnInit().catch(() => discussionsGlobalState[courseId].error = 'Unknown error')

	return {
		loading: computed(() => discussionsGlobalState[courseId].loading),
		error: computed(() => discussionsGlobalState[courseId].error),
		discussions: computed(() => discussionsGlobalState[courseId].discussions),
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
