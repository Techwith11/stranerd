import { ResetPasswordFactory } from '@root/modules/users/domain/factories/resetPassword'

export class GetResetPasswordFactoryUseCase {
	public call () :ResetPasswordFactory {
		return new ResetPasswordFactory()
	}

}
