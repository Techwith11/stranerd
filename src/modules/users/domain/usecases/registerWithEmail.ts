import IAuthRepository from '@root/modules/users/domain/irepositories/iauth'
import { AuthUser } from '@root/modules/users/domain/entities/auth'

export class RegisterWithEmailUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (user: AuthUser) : Promise<string> {
		return this.repository.registerWithEmail(user)
	}

}
