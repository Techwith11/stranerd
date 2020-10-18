import { ChatFirebaseDataSource } from './data/datasources/chat-firebase'
import { ChatTransformer } from './data/transformers/chat'
import { ChatRepository } from './data/repositories/chat'
import { AddChatUseCase } from './domain/usecases/addChat'
import { FindChatUseCase } from './domain/usecases/findChat'
import { ListenToChatsUseCase } from './domain/usecases/listenToChats'
import { GetChatFactoryUseCase } from './domain/usecases/getChatFactory'
import { MarkChatReadUseCase } from './domain/usecases/markChatRead'

const chatDataSource = new ChatFirebaseDataSource()

const chatTransformer = new ChatTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)

export const AddChat = new AddChatUseCase(chatRepository)
export const FindChat = new FindChatUseCase(chatRepository)
export const ListenToChats = new ListenToChatsUseCase(chatRepository)
export const MarkChatRead = new MarkChatReadUseCase(chatRepository)
export const GetChatFactory = new GetChatFactoryUseCase()
