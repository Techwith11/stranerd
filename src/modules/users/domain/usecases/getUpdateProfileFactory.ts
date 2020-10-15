import { UpdateProfileFactory } from '@modules/users/domain/factories/updateProfile'

export class GetUpdateProfileFactoryUseCase {
	public call () :UpdateProfileFactory {
		return new UpdateProfileFactory()
	}

}
