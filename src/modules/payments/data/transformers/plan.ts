import { PlanFromModel } from '@modules/payments/data/models/plan'
import { PlanEntity } from '@modules/payments/domain/entities/plan'

export class PlanTransformer {
	public fromJSON(model: PlanFromModel){
		const { id, title, description, monthlyId, monthlyPrice, questions, yearlyId, yearlyPrice } = model
		return new PlanEntity({
			id,title, description, monthlyPrice, monthlyId, yearlyPrice, yearlyId, questions
		})
	}
}
