import IAuthRepository from '@root/modules/users/domain/irepositories/iauth'
import { RegisterFactory } from '@root/modules/users/domain/factories/register'

export class RegisterWithEmailUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: RegisterFactory) : Promise<string> {
		return this.repository.registerWithEmail(factory.toModel())
	}

}
