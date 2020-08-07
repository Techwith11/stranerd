import ReplyEntity from '@root/modules/posts/domain/entities/replies'
import { computed, reactive } from '@vue/composition-api'
import { GetReplies } from '@root/modules/posts'

const PAGINATION_LIMIT = process.env.VUE_APP_PAGINATION_LIMIT
const globalState: { [key: string]: {
	loading: boolean,
	error: string,
	replies: ReplyEntity[] ,
	hasMore: boolean,
	olderRepliesLoading: boolean
} } = {}

const fetchReplies = async (postId: string) => {
	const postReplies = globalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const entities = await GetReplies.call(postId, date)
	globalState[postId].hasMore = entities.length === PAGINATION_LIMIT
	globalState[postId].replies = globalState[postId] ? globalState[postId].replies.concat(entities) : entities
}

export const useReplies = (postId: string) => {
	if(globalState[postId] === undefined){
		globalState[postId] = reactive({
			loading: false,
			replies: [] as ReplyEntity[],
			error: '',
			hasMore: false,
			olderRepliesLoading: false
		})
	}

	const fetchRepliesOnInit = async () => {
		globalState[postId].loading = true
		await fetchReplies(postId).catch(() => globalState[postId].error = 'Error fetching replies')
		globalState[postId].loading = false
	}
	const fetchOlderReplies = async () => {
		globalState[postId].olderRepliesLoading = true
		await fetchReplies(postId).catch(() => globalState[postId].error = 'Error fetching older replies')
		globalState[postId].olderRepliesLoading = false
	}

	return {
		loading: computed(() => globalState[postId].loading),
		error: computed(() => globalState[postId].error),
		replies: computed(() => globalState[postId].replies.reverse()),
		hasMore: computed(() => globalState[postId].hasMore),
		olderRepliesLoading: computed(() => globalState[postId].olderRepliesLoading),
	}
}
