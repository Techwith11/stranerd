import { ReplyEntity } from '@modules/posts/domain/entities/reply'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddReply, DownvoteReply, GetReplyFactory, ListenToReplies, UpvoteReply } from '@modules/posts'
import { Notify } from '@application/config/notifications'
import { fetchUser } from '@application/usecases/users/users'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useStore } from '@application/usecases/store'

const repliesGlobalState: { [key: string]: {
	loading: boolean,
	error: string,
	replies: ReplyEntity[],
	listener: () => void
} } = {}
const singleReplyGlobalState: { [key: string]: {
	loading: boolean,
	voting: boolean,
	user: UserEntity | undefined
}} = {}

const startListener = async (postId: string) => {
	const addReplies = (entities: ReplyEntity[]) => repliesGlobalState[postId].replies = entities
	repliesGlobalState[postId].listener = await ListenToReplies.call(postId, addReplies)
}

export const useReplies = (postId: string) => {
	if(repliesGlobalState[postId] === undefined){
		repliesGlobalState[postId] = reactive({
			loading: false,
			replies: [] as ReplyEntity[],
			error: '',
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
	const fetchReplyUser = async () => {
		singleReplyGlobalState[reply.id].loading = true
		singleReplyGlobalState[reply.id].user = await fetchUser(reply.userId)
		singleReplyGlobalState[reply.id].loading = false
	}
	if(singleReplyGlobalState[reply.id] === undefined){
		singleReplyGlobalState[reply.id] = reactive({
			loading: false,
			voting: false,
			votes: [],
			user: undefined
		})
		fetchReplyUser()
	}

	const upvoteReply = async () => {
		const id = useStore().auth.getId.value
		singleReplyGlobalState[reply.id].voting = true
		await UpvoteReply.call(postId, reply, id)
		repliesGlobalState[postId].replies.find((r) => r.id === reply.id)!.votes[id] = true
		singleReplyGlobalState[reply.id].voting = false
	}

	const downvoteReply = async () => {
		const id = useStore().auth.getId.value
		singleReplyGlobalState[reply.id].voting = true
		await DownvoteReply.call(postId, reply, id)
		repliesGlobalState[postId].replies.find((r) => r.id === reply.id)!.votes[id] = false
		singleReplyGlobalState[reply.id].voting = false
	}

	return {
		loading: computed(() => singleReplyGlobalState[reply.id].loading),
		voting: computed(() => singleReplyGlobalState[reply.id].voting),
		user: computed(() => singleReplyGlobalState[reply.id].user),
		canVote: computed(() => reply.userId !== useStore().auth.getId.value && !singleReplyGlobalState[reply.id].voting),
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
