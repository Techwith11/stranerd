import { IAuthRepository } from '../irepositories/iauth'
import { UpdateProfileFactory } from '../factories/updateProfile'

export class UpdateProfileUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: UpdateProfileFactory) :Promise<void> {
		return await this.repository.updateProfile(id, await factory.toModel())
	}

}
