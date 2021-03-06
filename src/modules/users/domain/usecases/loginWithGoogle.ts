import { IAuthRepository } from '../irepositories/iauth'

export class LoginWithGoogleUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call () : Promise<string> {
		return await this.repository.loginWithGoogle()
	}

}
