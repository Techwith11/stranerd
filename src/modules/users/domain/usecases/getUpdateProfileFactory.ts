import { UpdateProfileFactory } from '@root/modules/users/domain/factories/updateProfile'

export class GetUpdateProfileFactoryUseCase {
	public call () :UpdateProfileFactory {
		return new UpdateProfileFactory()
	}

}
