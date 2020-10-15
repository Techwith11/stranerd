import { PostFactory } from '@modules/posts/domain/factories/post'

export class GetPostFactoryUseCase {
	public call () :PostFactory {
		return new PostFactory()
	}

}
