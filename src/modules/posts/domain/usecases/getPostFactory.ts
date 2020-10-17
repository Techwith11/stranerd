import { PostFactory } from '../factories/post'

export class GetPostFactoryUseCase {
	public call () :PostFactory {
		return new PostFactory()
	}

}
