import { RegisterFactory } from '@root/modules/users/domain/factories/register'

export class GetRegisterFactoryUseCase {
	public call () :RegisterFactory {
		return new RegisterFactory()
	}

}
