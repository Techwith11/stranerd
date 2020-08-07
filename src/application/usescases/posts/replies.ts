import ReplyEntity from '@root/modules/posts/domain/entities/replies'
import { computed, reactive } from '@vue/composition-api'
import { GetReplies, ListenToReplies } from '@root/modules/posts'

const PAGINATION_LIMIT = process.env.VUE_APP_PAGINATION_LIMIT
const globalState: { [key: string]: {
	fetched: boolean,
	loading: boolean,
	error: string,
	replies: ReplyEntity[] ,
	hasMore: boolean,
	olderRepliesLoading: boolean,
	listener: () => void
} } = {}

const fetchReplies = async (postId: string) => {
	const postReplies = globalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const entities = await GetReplies.call(postId, date)
	globalState[postId].hasMore = entities.length === PAGINATION_LIMIT
	globalState[postId].replies = globalState[postId] ? globalState[postId].replies.concat(entities) : entities
}

const startListener = async (postId: string) => {
	const postReplies = globalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const addReplies = (entities: ReplyEntity[]) => {
		entities.forEach(entity => {
			const index = globalState[postId].replies.findIndex(e => e.id === entity.id)
			index !== -1 ? globalState[postId].replies[index] = entity : globalState[postId].replies.unshift(entity)
		})
	}
	globalState[postId].listener = await ListenToReplies.call(postId, addReplies, date)
}

export const useReplies = (postId: string) => {
	if(globalState[postId] === undefined){
		globalState[postId] = reactive({
			fetched: false,
			loading: false,
			replies: [] as ReplyEntity[],
			error: '',
			hasMore: false,
			olderRepliesLoading: false,
			listener: () => {},
		})
	}

	const fetchRepliesAndStartListenerOnInit = async () => {
		globalState[postId].loading = true
		await fetchReplies(postId).catch(() => globalState[postId].error = 'Error fetching replies')
		await startListener(postId).catch(() => globalState[postId].error = 'Error starting listener')
		globalState[postId].loading = false
	}
	const fetchOlderReplies = async () => {
		globalState[postId].olderRepliesLoading = true
		await fetchReplies(postId).catch(() => globalState[postId].error = 'Error fetching older replies')
		globalState[postId].olderRepliesLoading = false
	}

	fetchRepliesAndStartListenerOnInit().then(() => globalState[postId].fetched = true)

	return {
		fetched: computed(() => globalState[postId].fetched),
		loading: computed(() => globalState[postId].loading),
		error: computed(() => globalState[postId].error),
		replies: computed(() => globalState[postId].replies.reverse()),
		hasMore: computed(() => globalState[postId].hasMore),
		olderRepliesLoading: computed(() => globalState[postId].olderRepliesLoading),

		fetchOlderReplies,
		startListener: () => startListener(postId),
		closeListener: globalState[postId].listener()
	}
}
