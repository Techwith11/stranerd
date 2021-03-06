import { IAuthRepository } from '../irepositories/iauth'

export class LogoutUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call () : Promise<void> {
		return await this.repository.logout()
	}

}
