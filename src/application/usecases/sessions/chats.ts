import { ChatEntity } from '@modules/sessions/domain/entities/chat'
import { computed, reactive, watch } from '@vue/composition-api'
import { AddChat, GetChatFactory, ListenToChats } from '@modules/sessions'
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
