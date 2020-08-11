import { IAuthRepository } from '@root/modules/users/domain/irepositories/iauth'
import { UpdatePasswordFactory } from '@root/modules/users/domain/factories/updatePassword'

export class UpdatePasswordUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: UpdatePasswordFactory) : Promise<void> {
		return await this.repository.updatePassword(factory.toModel())
	}

}
