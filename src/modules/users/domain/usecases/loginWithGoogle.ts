import IAuthRepository from '@root/modules/users/domain/irepositories/iauth'

export class LoginWithGoogleUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public async call () : Promise<string> {
		return this.repository.loginWithGoogle()
	}

}
