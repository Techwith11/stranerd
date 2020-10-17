import { ISubjectRepository } from '../../domain/irepositories/isubject'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { SubjectTransformer } from '../transformers/subject'
import { SubjectToModel } from '../models/subject'

export class SubjectRepository implements ISubjectRepository{
	private dataSource: SubjectBaseDataSource
	private transformer: SubjectTransformer

	constructor(dataSource: SubjectBaseDataSource, transformer: SubjectTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

	public async delete(id: string): Promise<void> {
		return await this.dataSource.delete(id)
	}

	public async add(data: SubjectToModel): Promise<string> {
		return await this.dataSource.add(data)
	}

	public async update(id: string, data: SubjectToModel): Promise<string> {
		return await this.dataSource.update(id, data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		return undefined
	}

}
