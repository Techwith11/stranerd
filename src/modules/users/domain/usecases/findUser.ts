import { IUserRepository } from '@modules/users/domain/irepositories/iuser'
import { UserEntity } from '@modules/users/domain/entities/user'

export class FindUserUseCase {
	private repository: IUserRepository

	constructor(repository: IUserRepository) {
		this.repository = repository
	}

	public async call (id: string) : Promise<UserEntity | undefined> {
		return await this.repository.find(id)
	}

}
