import { GetClauses } from '@modules/core/data/datasources/base'
import { ChatBaseDataSource } from '../datasources/chat-base'
import { ChatTransformer } from '../transformers/chat'
import { IChatRepository } from '../../domain/irepositories/ichat'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatRepository implements IChatRepository {
	private dataSource: ChatBaseDataSource
	private transformer: ChatTransformer

	constructor(dataSource: ChatBaseDataSource, transformer: ChatTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(sessionId: string, data: ChatToModel) {
		return await this.dataSource.create(sessionId, data)
	}

	public async get(sessionId: string, conditions?: GetClauses) {
		const models = await this.dataSource.get(sessionId, conditions)
		return models.map((model: ChatFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(sessionId: string, callback: (entities: ChatEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: ChatFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(sessionId, listenCB, conditions)
	}

	public async update(sessionId: string, id: string, data: Partial<ChatToModel>): Promise<void> {
		await this.dataSource.update(sessionId, id, data)
	}

	public async delete(sessionId: string, id: string): Promise<void> {
		return await this.dataSource.delete(sessionId, id)
	}

}
