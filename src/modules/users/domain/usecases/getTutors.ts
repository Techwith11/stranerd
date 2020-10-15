import { IUserRepository } from '../irepositories/iuser'
import { UserEntity } from '../entities/user'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetTutorsUseCase {
	private repository: IUserRepository

	constructor(repository: IUserRepository) {
		this.repository = repository
	}

	public async call () : Promise<UserEntity[]> {
		const conditions: GetClauses = {
			limit: 100,
			order: { field: 'tutor.rating', desc: true },
			where: [
				{ field: 'roles.isTutor', condition: '==', value: true },
				{ field: 'tutor.canTeach', condition: '==', value: true }
			]
		}
		return await this.repository.get(conditions)
	}

}
