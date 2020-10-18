import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { ChatBaseDataSource } from './chat-base'
import { ChatFromModel, ChatToModel } from '../models/chat'

export class ChatFirebaseDataSource implements ChatBaseDataSource{

	public async create(sessionId: string, data: ChatToModel): Promise<string> {
		return await DatabaseService.create(`sessions/${sessionId}/chats`, data)
	}

	public async get(sessionId: string, conditions?: GetClauses): Promise<ChatFromModel[]> {
		const docs = await DatabaseService.get(`sessions/${sessionId}/chats`, conditions) as { [key: string]: ChatFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}

	public async find(sessionId: string, id: string): Promise<ChatFromModel | undefined> {
		return await DatabaseService.get(`sessions/${sessionId}/chats/${id}`)
	}

	public async listen(sessionId: string, callback: (documents: ChatFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		const cb = (documents: { [key: string]: ChatFromModel } ) => {
			const models = Object.entries(documents ?? {}).map((e) => ({ ...e[1], id: e[0] }))
			callback(models)
		}
		return await DatabaseService.listen(`sessions/${sessionId}/chats`, cb, conditions)
	}

	public async update(sessionId: string, id: string, data: Partial<ChatToModel>): Promise<string> {
		await DatabaseService.update(`sessions/${sessionId}/chats/${id}`, data)
		return id
	}

	public async delete(sessionId: string, id: string): Promise<void> {
		return await DatabaseService.delete(`sessions/${sessionId}/chats/${id}`)
	}

}
