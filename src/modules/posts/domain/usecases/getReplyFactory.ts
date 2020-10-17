import { ReplyFactory } from '../factories/reply'

export class GetReplyFactoryUseCase {
	public call() :ReplyFactory {
		return new ReplyFactory()
	}
}
