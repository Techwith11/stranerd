import { ResetPasswordFactory } from '../factories/resetPassword'

export class GetResetPasswordFactoryUseCase {
	public call () :ResetPasswordFactory {
		return new ResetPasswordFactory()
	}

}
