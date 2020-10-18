import { GetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	public abstract create: (sessionId: string, data: ChatToModel) => Promise<string>
	public abstract get: (sessionId: string, condition?: GetClauses) => Promise<ChatFromModel[]>
	public abstract listen: (sessionId: string, callback: (documents: ChatFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
	public abstract update: (sessionId: string, id: string, data: Partial<ChatToModel>) => Promise<string>
	public abstract delete: (sessionId: string, id: string) => Promise<void>
}
