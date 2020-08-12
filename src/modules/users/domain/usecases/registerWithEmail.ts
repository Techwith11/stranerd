import { IAuthRepository } from '@root/modules/users/domain/irepositories/iauth'
import { RegisterFactory } from '@root/modules/users/domain/factories/register'

export class RegisterWithEmailUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: RegisterFactory) : Promise<string> {
		return await this.repository.registerWithEmail(await factory.toModel())
	}

}
