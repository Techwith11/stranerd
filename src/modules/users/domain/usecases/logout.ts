import IAuthRepository from '@root/modules/users/domain/irepositories/iauth'

export class LogoutUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call () : Promise<void> {
		return this.repository.logout()
	}

}
