import { IAuthRepository } from '@modules/users/domain/irepositories/iauth'
import { ResetPasswordFactory } from '@modules/users/domain/factories/resetPassword'

export class ResetPasswordUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: ResetPasswordFactory) : Promise<void> {
		return await this.repository.resetPassword(await factory.toModel())
	}

}
