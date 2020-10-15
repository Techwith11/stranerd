import { ICourseRepository } from '@modules/courses/domain/irepositories/icourse'
import { CourseBaseDataSource } from '@modules/courses/data/datasources/course-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { CourseTransformer } from '@modules/courses/data/transformers/course'
import { CourseToModel } from '@modules/courses/data/models/course'

export class CourseRepository implements ICourseRepository{
	private dataSource: CourseBaseDataSource
	private transformer: CourseTransformer

	constructor(dataSource: CourseBaseDataSource, transformer: CourseTransformer) {
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

	public async add(data: CourseToModel): Promise<string> {
		return await this.dataSource.add(data)
	}

	public async update(id: string, data: CourseToModel): Promise<string> {
		return await this.dataSource.update(id, data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		return undefined
	}

}
