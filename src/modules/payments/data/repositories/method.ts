import { IMethodRepository } from '@modules/payments/domain/irepositories/imethod'
import { MethodBaseDataSource } from '@modules/payments/data/datasources/method-base'
import { MethodTransformer } from '@modules/payments/data/transformers/method'
import { GetClauses } from '@modules/core/data/datasources/base'
import { MethodEntity } from '@modules/payments/domain/entities/method'

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
