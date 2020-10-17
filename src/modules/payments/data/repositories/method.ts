import { IMethodRepository } from '../../domain/irepositories/imethod'
import { MethodBaseDataSource } from '../datasources/method-base'
import { MethodTransformer } from '../transformers/method'
import { GetClauses } from '@modules/core/data/datasources/base'
import { MethodEntity } from '../../domain/entities/method'

export class MethodRepository implements IMethodRepository {
	private readonly dataSource: MethodBaseDataSource
	private readonly transformer: MethodTransformer

	constructor(dataSource: MethodBaseDataSource, transformer: MethodTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async get(id: string, conditions?: GetClauses): Promise<MethodEntity[]> {
		const models = await this.dataSource.get(id, conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

}
