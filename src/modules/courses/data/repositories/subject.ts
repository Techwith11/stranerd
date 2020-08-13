import { ISubjectRepository } from '@root/modules/courses/domain/irepositories/isubject'
import { SubjectBaseDataSource } from '@root/modules/courses/data/datasources/subject-base'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SubjectTransformer } from '@root/modules/courses/data/transformers/subject'

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

}
