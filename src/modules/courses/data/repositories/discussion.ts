import { GetClauses } from '@root/modules/core/data/datasources/base'
import { DiscussionBaseDataSource } from '@root/modules/courses/data/datasources/discussion-base'
import { DiscussionTransformer } from '@root/modules/courses/data/transformers/discussion'
import { IDiscussionRepository } from '@root/modules/courses/domain/irepositories/idiscussion'
import { DiscussionFromModel, DiscussionToModel } from '@root/modules/courses/data/models/discussion'
import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'

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
