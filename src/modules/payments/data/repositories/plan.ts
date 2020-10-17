import { IPlanRepository } from '../../domain/irepositories/iplan'
import { PlanBaseDataSource } from '../datasources/plan-base'
import { PlanTransformer } from '../transformers/plan'
import { GetClauses } from '@modules/core/data/datasources/base'
import { PlanEntity } from '../../domain/entities/plan'

export class PlanRepository implements IPlanRepository {
	private readonly dataSource: PlanBaseDataSource
	private readonly transformer: PlanTransformer

	constructor(dataSource: PlanBaseDataSource, transformer: PlanTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async get(conditions?: GetClauses): Promise<PlanEntity[]> {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

}
