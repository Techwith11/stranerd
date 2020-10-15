import { LoginFactory } from '@modules/users/domain/factories/login'

export class GetLoginFactoryUseCase {
	public call () :LoginFactory {
		return new LoginFactory()
	}

}
