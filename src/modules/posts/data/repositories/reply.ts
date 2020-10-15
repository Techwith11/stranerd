import { GetClauses } from '@modules/core/data/datasources/base'
import { ReplyBaseDataSource } from '../datasources/reply-base'
import { ReplyTransformer } from '../transformers/reply'
import { IReplyRepository } from '../../domain/irepositories/ireply'
import { ReplyFromModel, ReplyToModel } from '../models/reply'
import { ReplyEntity } from '../../domain/entities/reply'

export class ReplyRepository implements IReplyRepository {
	private dataSource: ReplyBaseDataSource
	private transformer: ReplyTransformer

	constructor(dataSource: ReplyBaseDataSource, transformer: ReplyTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(postId: string, data: ReplyToModel) {
		return await this.dataSource.create(postId, data)
	}

	public async get(postId: string, conditions?: GetClauses) {
		const models = await this.dataSource.get(postId, conditions)
		return models.map((model: ReplyFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(postId: string, callback: (entities: ReplyEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: ReplyFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(postId, listenCB, conditions)
	}

	public async upvote(postId: string, reply: ReplyEntity, id: string){
		return await this.dataSource.upvote(postId, reply.id, reply.userId, id)
	}

	public async downvote(postId: string, reply: ReplyEntity, id: string){
		return await this.dataSource.downvote(postId, reply.id, reply.userId, id)
	}

}
