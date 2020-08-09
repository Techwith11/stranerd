import ReplyEntity from '@root/modules/posts/domain/entities/replies'
import { computed, reactive } from '@vue/composition-api'
import { GetReplies, ListenToReplies } from '@root/modules/posts'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { firestore } from '@root/services/firebase'

const PAGINATION_LIMIT = process.env.VUE_APP_PAGINATION_LIMIT
const repliesGlobalState: { [key: string]: {
	fetched: boolean,
	loading: boolean,
	error: string,
	replies: ReplyEntity[],
	hasMore: boolean,
	olderRepliesLoading: boolean,
	listener: () => void
} } = {}
const votesAndUsersGlobalState: { [key: string]: {
		loading: boolean,
		votes: string[],
		user: object | undefined
	} } = {}

const fetchReplies = async (postId: string) => {
	const postReplies = repliesGlobalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const entities = await GetReplies.call(postId, date)
	repliesGlobalState[postId].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach(entity => {
		const index = repliesGlobalState[postId].replies.findIndex(e => e.id === entity.id)
		index !== -1 ? repliesGlobalState[postId].replies[index] = entity : repliesGlobalState[postId].replies.unshift(entity)
	})
}

const startListener = async (postId: string) => {
	const postReplies = repliesGlobalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const addReplies = (entities: ReplyEntity[]) => {
		entities.forEach(entity => {
			const index = repliesGlobalState[postId].replies.findIndex(e => e.id === entity.id)
			index !== -1 ? repliesGlobalState[postId].replies[index] = entity : repliesGlobalState[postId].replies.push(entity)
		})
	}
	repliesGlobalState[postId].listener = await ListenToReplies.call(postId, addReplies, date)
}

export const useReplies = (postId: string) => {
	const fetchRepliesOnInit = async () => {
		repliesGlobalState[postId].loading = true
		await fetchReplies(postId).catch(() => repliesGlobalState[postId].error = 'Error fetching replies')
		repliesGlobalState[postId].fetched = true
		repliesGlobalState[postId].loading = false
	}
	if(repliesGlobalState[postId] === undefined){
		repliesGlobalState[postId] = reactive({
			fetched: false,
			loading: false,
			replies: [] as ReplyEntity[],
			error: '',
			hasMore: false,
			olderRepliesLoading: false,
			listener: () => {},
		})
		fetchRepliesOnInit()
	}

	const startListenerOnInit = async () => {
		repliesGlobalState[postId].loading = true
		await startListener(postId).catch(() => repliesGlobalState[postId].error = 'Error starting listener')
		repliesGlobalState[postId].loading = false
	}
	const fetchOlderReplies = async () => {
		repliesGlobalState[postId].olderRepliesLoading = true
		await fetchReplies(postId).catch(() => repliesGlobalState[postId].error = 'Error fetching older replies')
		repliesGlobalState[postId].olderRepliesLoading = false
	}

	startListenerOnInit()

	return {
		fetched: computed(() => repliesGlobalState[postId].fetched),
		loading: computed(() => repliesGlobalState[postId].loading),
		error: computed(() => repliesGlobalState[postId].error),
		replies: computed(() => repliesGlobalState[postId].replies),
		hasMore: computed(() => repliesGlobalState[postId].hasMore),
		olderRepliesLoading: computed(() => repliesGlobalState[postId].olderRepliesLoading),

		fetchOlderReplies,
		startListener: () => startListener(postId),
		closeListener: () => repliesGlobalState[postId].listener()
	}
}

export const useSingleReply = (post: PostEntity,reply: ReplyEntity) => {
	const fetchUserAndVotes = async () => {
		votesAndUsersGlobalState[reply.id].loading = true
		let doc = await firestore.collection('users').doc(reply.userId).get()
		votesAndUsersGlobalState[reply.id].user = { '.key': doc.id, ...doc.data() }
		doc = await firestore.doc(`posts/${post.id}/replies/${reply.id}/votes/votes`).get()
		if(doc.exists) {
			votesAndUsersGlobalState[reply.id].votes = doc.data()?.votes ?? []
		}
		votesAndUsersGlobalState[reply.id].loading = false
	}
	if(votesAndUsersGlobalState[reply.id] === undefined){
		votesAndUsersGlobalState[reply.id] = reactive({
			loading: false,
			votes: [],
			user: undefined
		})
		fetchUserAndVotes()
	}

	return {
		loading: computed(() => votesAndUsersGlobalState[reply.id].loading),
		votes: computed(() => votesAndUsersGlobalState[reply.id].votes),
		user: computed(() => votesAndUsersGlobalState[reply.id].user)
	}
}
