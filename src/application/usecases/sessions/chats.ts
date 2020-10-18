import { ChatEntity } from '@modules/sessions/domain/entities/chat'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddChat, FindChat, GetChatFactory, ListenToChats, MarkChatRead } from '@modules/sessions'
import { Notify } from '@application/config/notifications'
import { useStore } from '@application/usecases/store'

const chatsGlobalState: { [key: string]: {
	loading: boolean,
	error: string,
	chats: ChatEntity[],
	listener: () => void
}} = {}


const startListener = async (sessionId: string) => {
	const addChats = (entities: ChatEntity[]) => chatsGlobalState[sessionId].chats = entities
	chatsGlobalState[sessionId].listener = await ListenToChats.call(sessionId, addChats)
}

export const useChats = (sessionId: string) => {
	if(chatsGlobalState[sessionId] === undefined){
		chatsGlobalState[sessionId] = reactive({
			loading: false,
			chats: [] as ChatEntity[],
			error: '',
			listener: () => {},
		})
	}

	const startListenerOnInit = async () => {
		chatsGlobalState[sessionId].loading = true
		await startListener(sessionId).catch(() => chatsGlobalState[sessionId].error = 'Error starting listener')
		chatsGlobalState[sessionId].loading = false
	}

	startListenerOnInit().catch(() => {})

	return {
		loading: computed(() => chatsGlobalState[sessionId].loading),
		error: computed(() => chatsGlobalState[sessionId].error),
		chats: computed(() => chatsGlobalState[sessionId].chats.reverse()),
		closeListener: () => chatsGlobalState[sessionId].listener()
	}
}

export const useCreateChat = (sessionId: string) => {
	const state = reactive({
		loading: false,
		factory: GetChatFactory.call()
	})
	state.factory.from = useStore().auth.getId.value

	const createChat = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.from = useStore().auth.getId.value
			try {
				await AddChat.call(sessionId, state.factory)
				state.factory.reset()
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	watch(() => useStore().auth.getId, () => state.factory.from = useStore().auth.getId.value)

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		createChat
	}
}

export const useSingleChat = (sessionId: string, id: string) => {
	const state = reactive({
		loading: false,
		chat: undefined as ChatEntity | undefined,
		error: ''
	})

	const fetchChat = async () => {
		const chat = chatsGlobalState[sessionId].chats.find((c) => c.id === id)
		if(chat) state.chat = chat
		else state.chat = await FindChat.call(sessionId, id)
	}

	fetchChat().catch(() => state.error = 'An error occurred')

	const markRead = async () => {
		state.loading = true
		if(state.chat?.isRead === false) await MarkChatRead.call(sessionId, id)
		state.loading = false
	}

	return {
		loading: computed(() => state.loading),
		error: computed(() => state.error),
		markRead
	}
}
