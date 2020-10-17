import { IQuestionRepository } from '../../domain/irepositories/iquestion'
import { QuestionBaseDataSource } from '../datasources/question-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { QuestionTransformer } from '../transformers/question'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export class QuestionRepository implements IQuestionRepository{
	private dataSource: QuestionBaseDataSource
	private transformer: QuestionTransformer

	constructor(dataSource: QuestionBaseDataSource, transformer: QuestionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(data: QuestionToModel) {
		return await this.dataSource.create(data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: QuestionFromModel) => this.transformer.fromJSON(model))
	}

	public async update(id: string, data: QuestionToModel) {
		return await this.dataSource.update(id, data)
	}

	public async delete(id: string) {
		return await this.dataSource.delete(id)
	}

}
