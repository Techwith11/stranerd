import { ReplyEntity } from '@root/modules/posts/domain/entities/reply'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddReply, DownvoteReply, GetReplyFactory, ListenToReplies, UpvoteReply } from '@root/modules/posts'
import { Notify } from '@/config/notifications'
import { fetchUser } from '@/usecases/users/users'
import { UserEntity } from '@root/modules/users/domain/entities/user'
import { FirestoreService } from '@root/modules/core/services/firebase'
import { useStore } from '@/usecases/store'

const repliesGlobalState: { [key: string]: {
	loading: boolean,
	error: string,
	replies: ReplyEntity[],
	listener: () => void
} } = {}
const votesAndUsersGlobalState: { [key: string]: {
	loading: boolean,
	voting: boolean,
	votes: string[],
	user: UserEntity | undefined
}} = {}

const startListener = async (postId: string) => {
	const addReplies = (entities: ReplyEntity[]) => {
		entities.forEach((entity) => {
			const index = repliesGlobalState[postId].replies.findIndex((e) => e.id === entity.id)
			index !== -1 ? repliesGlobalState[postId].replies[index] = entity : repliesGlobalState[postId].replies.push(entity)
		})
	}
	repliesGlobalState[postId].listener = await ListenToReplies.call(postId, addReplies)
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

	const startListenerOnInit = async () => {
		repliesGlobalState[postId].loading = true
		await startListener(postId).catch(() => repliesGlobalState[postId].error = 'Error starting listener')
		repliesGlobalState[postId].loading = false
	}

	startListenerOnInit().catch(() => repliesGlobalState[postId].error = 'Unknown error')

	return {
		loading: computed(() => repliesGlobalState[postId].loading),
		error: computed(() => repliesGlobalState[postId].error),
		replies: computed(() => repliesGlobalState[postId].replies),
		closeListener: () => repliesGlobalState[postId].listener()
	}
}

export const useSingleReply = (postId: string,reply: ReplyEntity) => {
	const fetchUserAndVotes = async () => {
		votesAndUsersGlobalState[reply.id].loading = true
		votesAndUsersGlobalState[reply.id].user = await fetchUser(reply.userId)
		const doc = await FirestoreService.find(`posts/${postId}/replies/${reply.id}/votes`, 'votes') as { id: string, votes: string[] }
		votesAndUsersGlobalState[reply.id].votes = doc?.votes ?? []
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
		await UpvoteReply.call(postId, reply, useStore().auth.getId.value)
		votesAndUsersGlobalState[reply.id].votes.push(useStore().auth.getId.value)
		votesAndUsersGlobalState[reply.id].voting = false
	}

	const downvoteReply = async () => {
		votesAndUsersGlobalState[reply.id].voting = true
		await DownvoteReply.call(postId, reply, useStore().auth.getId.value)
		votesAndUsersGlobalState[reply.id].votes = votesAndUsersGlobalState[reply.id].votes.filter((id) => id !== useStore().auth.getId.value)
		votesAndUsersGlobalState[reply.id].voting = false
	}

	return {
		loading: computed(() => votesAndUsersGlobalState[reply.id].loading),
		voting: computed(() => votesAndUsersGlobalState[reply.id].voting),
		hasVoted: computed(() => votesAndUsersGlobalState[reply.id].votes.includes(useStore().auth.getId.value)),
		canVote: computed(() => reply.userId !== useStore().auth.getId.value && !votesAndUsersGlobalState[reply.id].voting),
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
	state.factory.userId = useStore().auth.getId.value

	const createReply = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try {
				await AddReply.call(postId, state.factory)
				state.factory.reset()
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	watch(() => useStore().auth.getId, () => state.factory.userId = useStore().auth.getId.value)

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		isLoggedIn: computed(() => useStore().auth.isLoggedIn.value),
		createReply
	}
}
