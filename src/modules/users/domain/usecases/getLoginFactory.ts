import { LoginFactory } from '../factories/login'

export class GetLoginFactoryUseCase {
	public call () :LoginFactory {
		return new LoginFactory()
	}

}
