import { GetClauses } from '@modules/core/data/datasources/base'
import { DiscussionBaseDataSource } from '@modules/courses/data/datasources/discussion-base'
import { DiscussionTransformer } from '@modules/courses/data/transformers/discussion'
import { IDiscussionRepository } from '@modules/courses/domain/irepositories/idiscussion'
import { DiscussionFromModel, DiscussionToModel } from '@modules/courses/data/models/discussion'
import { DiscussionEntity } from '@modules/courses/domain/entities/discussion'

export class DiscussionRepository implements IDiscussionRepository {
	private dataSource: DiscussionBaseDataSource
	private transformer: DiscussionTransformer

	constructor(dataSource: DiscussionBaseDataSource, transformer: DiscussionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(courseId: string, data: DiscussionToModel) {
		return await this.dataSource.create(courseId, data)
	}

	public async get(courseId: string, conditions?: GetClauses) {
		const models = await this.dataSource.get(courseId, conditions)
		return models.map((model: DiscussionFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(courseId: string, callback: (entities: DiscussionEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: DiscussionFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(courseId, listenCB, conditions)
	}

}
