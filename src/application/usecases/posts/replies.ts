import { ReplyEntity } from '@root/modules/posts/domain/entities/reply'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddReply, DownvoteReply, GetReplies, GetReplyFactory, ListenToReplies, UpvoteReply } from '@root/modules/posts'
import { firestore } from '@root/services/firebase'
import store from '@/store/'
import { Notify } from '@/config/notifications'
import { fetchUser } from '@/usecases/users/users'
import { UserEntity } from '@root/modules/users/domain/entities/user'

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
	voting: boolean,
	votes: string[],
	user: UserEntity | undefined
}} = {}

const fetchReplies = async (postId: string) => {
	const postReplies = repliesGlobalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const entities = await GetReplies.call(postId, date)
	repliesGlobalState[postId].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach((entity) => {
		const index = repliesGlobalState[postId].replies.findIndex((e) => e.id === entity.id)
		index !== -1 ? repliesGlobalState[postId].replies[index] = entity : repliesGlobalState[postId].replies.unshift(entity)
	})
}

const startListener = async (postId: string) => {
	const postReplies = repliesGlobalState[postId].replies
	const lastIndex = postReplies.length - 1
	const date = postReplies[lastIndex]?.createdAt
	const addReplies = (entities: ReplyEntity[]) => {
		entities.forEach((entity) => {
			const index = repliesGlobalState[postId].replies.findIndex((e) => e.id === entity.id)
			index !== -1 ? repliesGlobalState[postId].replies[index] = entity : repliesGlobalState[postId].replies.push(entity)
		})
	}
	repliesGlobalState[postId].listener = await ListenToReplies.call(postId, addReplies, date)
}

export const useReplies = (postId: string) => {
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
	}

	const fetchRepliesAndStartListenerOnInit = async () => {
		repliesGlobalState[postId].loading = true
		if(!repliesGlobalState[postId].fetched){
			await fetchReplies(postId).catch(() => repliesGlobalState[postId].error = 'Error fetching replies')
			repliesGlobalState[postId].fetched = true
		}
		await startListener(postId).catch(() => repliesGlobalState[postId].error = 'Error starting listener')
		repliesGlobalState[postId].loading = false
	}
	const fetchOlderReplies = async () => {
		repliesGlobalState[postId].olderRepliesLoading = true
		await fetchReplies(postId).catch(() => repliesGlobalState[postId].error = 'Error fetching older replies')
		repliesGlobalState[postId].olderRepliesLoading = false
	}

	fetchRepliesAndStartListenerOnInit().catch(() => repliesGlobalState[postId].error = 'Unknown error')

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

export const useSingleReply = (postId: string,reply: ReplyEntity) => {
	const fetchUserAndVotes = async () => {
		votesAndUsersGlobalState[reply.id].loading = true
		votesAndUsersGlobalState[reply.id].user = await fetchUser(reply.userId)
		const doc = await firestore.doc(`posts/${postId}/replies/${reply.id}/votes/votes`).get()
		votesAndUsersGlobalState[reply.id].votes = doc?.data()?.votes ?? []
		votesAndUsersGlobalState[reply.id].loading = false
	}
	if(votesAndUsersGlobalState[reply.id] === undefined){
		votesAndUsersGlobalState[reply.id] = reactive({
			loading: false,
			voting: false,
			votes: [],
			user: undefined
		})
		fetchUserAndVotes()
	}

	const upvoteReply = async () => {
		votesAndUsersGlobalState[reply.id].voting = true
		await UpvoteReply.call(postId, reply, store.getters.getId)
		votesAndUsersGlobalState[reply.id].votes.push(store.getters.getId)
		votesAndUsersGlobalState[reply.id].voting = false
	}

	const downvoteReply = async () => {
		votesAndUsersGlobalState[reply.id].voting = true
		await DownvoteReply.call(postId, reply, store.getters.getId)
		votesAndUsersGlobalState[reply.id].votes = votesAndUsersGlobalState[reply.id].votes.filter((id) => id !== store.getters.getId)
		votesAndUsersGlobalState[reply.id].voting = false
	}

	return {
		loading: computed(() => votesAndUsersGlobalState[reply.id].loading),
		voting: computed(() => votesAndUsersGlobalState[reply.id].voting),
		hasVoted: computed(() => votesAndUsersGlobalState[reply.id].votes.includes(store.getters.getId)),
		canVote: computed(() => reply.userId !== store.getters.getId && !votesAndUsersGlobalState[reply.id].voting),
		votes: computed(() => votesAndUsersGlobalState[reply.id].votes.length),
		user: computed(() => votesAndUsersGlobalState[reply.id].user),
		upvoteReply, downvoteReply
	}
}

export const useCreateReply = (postId: string) => {
	const state = reactive({
		loading: false,
		factory: GetReplyFactory.call()
	})
	state.factory.userId = store.getters.getId

	const createReply = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = store.getters.getId
			try {
				await AddReply.call(postId, state.factory)
				state.factory.reset()
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	watch(() => store.getters.getId, () => state.factory.userId = store.getters.getId)

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		isLoggedIn: computed(() => store.getters.isLoggedIn),
		createReply
	}
}
