import { ReplyFactory } from '@root/modules/posts/domain/factories/reply'

export class GetReplyFactoryUseCase {
    public call() :ReplyFactory {
        return new ReplyFactory()
    }
}
