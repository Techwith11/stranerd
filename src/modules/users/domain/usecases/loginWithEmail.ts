import { IAuthRepository } from '@root/modules/users/domain/irepositories/iauth'
import { LoginFactory } from '@root/modules/users/domain/factories/login'

export class LoginWithEmailUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: LoginFactory) : Promise<string> {
		return await this.repository.loginWithEmail(factory.toModel())
	}

}
