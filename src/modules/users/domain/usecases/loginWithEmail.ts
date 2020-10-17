import { IAuthRepository } from '../irepositories/iauth'
import { LoginFactory } from '../factories/login'

export class LoginWithEmailUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: LoginFactory) : Promise<string> {
		return await this.repository.loginWithEmail(await factory.toModel())
	}

}
