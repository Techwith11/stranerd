import { UpdatePasswordFactory } from '@modules/users/domain/factories/updatePassword'

export class GetUpdatePasswordFactoryUseCase {
	public call () :UpdatePasswordFactory {
		return new UpdatePasswordFactory()
	}

}
