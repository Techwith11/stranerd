import { UpdatePasswordFactory } from '../factories/updatePassword'

export class GetUpdatePasswordFactoryUseCase {
	public call () :UpdatePasswordFactory {
		return new UpdatePasswordFactory()
	}

}
