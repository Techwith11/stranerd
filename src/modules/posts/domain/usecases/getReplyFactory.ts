import { ReplyFactory } from '@modules/posts/domain/factories/reply'

export class GetReplyFactoryUseCase {
	public call() :ReplyFactory {
		return new ReplyFactory()
	}
}
