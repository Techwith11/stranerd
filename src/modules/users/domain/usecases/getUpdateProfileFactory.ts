import { UpdateProfileFactory } from '../factories/updateProfile'

export class GetUpdateProfileFactoryUseCase {
	public call () :UpdateProfileFactory {
		return new UpdateProfileFactory()
	}

}
