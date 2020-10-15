import { IUserRepository } from '@modules/users/domain/irepositories/iuser'
import { UserEntity } from '@modules/users/domain/entities/user'
import { GetClauses } from '@modules/core/data/datasources/base'

export class FindUsersByEmailUseCase {
	private repository: IUserRepository

	constructor(repository: IUserRepository) {
		this.repository = repository
	}

	public async call (email: string) : Promise<UserEntity[]> {
		const conditions: GetClauses = {
			where: [
				{ field: 'bio.email', condition: '==', value: email }
			]
		}
		return await this.repository.get(conditions)
	}

}
