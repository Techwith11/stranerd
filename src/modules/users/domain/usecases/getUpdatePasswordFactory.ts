import { UpdatePasswordFactory } from '@root/modules/users/domain/factories/updatePassword'

export class GetUpdatePasswordFactoryUseCase {
	public call () :UpdatePasswordFactory {
		return new UpdatePasswordFactory()
	}

}
