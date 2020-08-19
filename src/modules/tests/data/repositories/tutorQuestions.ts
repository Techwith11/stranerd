import { ITutorQuestionRepository } from '@root/modules/tests/domain/irepositories/itutorQuestion'
import { TutorQuestionBaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-base'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TutorQuestionTransformer } from '@root/modules/tests/data/transformers/tutorQuestion'
import { TutorQuestionFromModel, TutorQuestionToModel } from '@root/modules/tests/data/models/tutorQuestion'

export class TutorQuestionRepository implements ITutorQuestionRepository{
	private dataSource: TutorQuestionBaseDataSource
	private transformer: TutorQuestionTransformer

	constructor(dataSource: TutorQuestionBaseDataSource, transformer: TutorQuestionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(data: TutorQuestionToModel) {
		return await this.dataSource.create(data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: TutorQuestionFromModel) => this.transformer.fromJSON(model))
	}

	public async update(id: string, data: TutorQuestionToModel) {
		return await this.dataSource.update(id, data)
	}

	public async delete(id: string) {
		return await this.dataSource.delete(id)
	}

}
