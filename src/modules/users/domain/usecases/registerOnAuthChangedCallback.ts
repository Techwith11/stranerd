import { IAuthRepository } from '../irepositories/iauth'
import firebase from '@root/services/firebase'

export class RegisterAuthChangedCallbackUseCase {
	private repository: IAuthRepository

	constructor(repository: IAuthRepository) {
		this.repository = repository
	}

	public call (cb: (user: firebase.User | null) => void) : void {
		return this.repository.registerOnAuthChangedCallback(cb)
	}

}
