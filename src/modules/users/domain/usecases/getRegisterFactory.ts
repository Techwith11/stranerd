import { RegisterFactory } from '../factories/register'

export class GetRegisterFactoryUseCase {
	public call () :RegisterFactory {
		return new RegisterFactory()
	}

}
