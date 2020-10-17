import { IAuthRepository } from '../irepositories/iauth'
import { ResetPasswordFactory } from '../factories/resetPassword'

export class ResetPasswordUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: ResetPasswordFactory) : Promise<void> {
		return await this.repository.resetPassword(await factory.toModel())
	}

}
