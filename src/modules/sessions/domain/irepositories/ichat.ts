import { GetClauses } from '@modules/core/data/datasources/base'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (sessionId: string, data: ChatToModel) => Promise<string>,
	get: (sessionId:string, conditions?: GetClauses) => Promise<ChatEntity[]>
	listen: (sessionId: string, callback: (entities: ChatEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
	update: (sessionId:string, id: string, data: Partial<ChatToModel>) => Promise<void>
	delete: (sessionId:string, id: string) => Promise<void>
}
