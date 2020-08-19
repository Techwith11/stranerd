import { IPlanRepository } from '@root/modules/payments/domain/irepositories/iplan'

export class GetSubscriptionPlansUsecase {
	private readonly repository: IPlanRepository

	constructor(repository: IPlanRepository) {
		this.repository = repository
	}

	public async call(){
		const conditions = {
			order: {
				field: 'questions',
				desc: false
			}
		}
		return this.repository.get(conditions)
	}
}
