import { IPostRepository } from '../../domain/irepositories/ipost'
import { PostBaseDataSource } from '../datasources/post-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { PostTransformer } from '../transformers/post'
import { PostFromModel, PostToModel } from '../models/post'
import { PostEntity } from '../../domain/entities/post'

export class PostRepository implements IPostRepository{
	private dataSource: PostBaseDataSource
	private transformer: PostTransformer

	constructor(dataSource: PostBaseDataSource, transformer: PostTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(data: PostToModel) {
		return await this.dataSource.create(data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: PostFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(callback: (entities: PostEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: PostFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(listenCB, conditions)
	}

}
