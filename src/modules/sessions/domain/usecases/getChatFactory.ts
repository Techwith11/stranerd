import { ChatFactory } from '@modules/sessions/domain/factories/chat'

export class GetChatFactoryUseCase {
	public async call () :Promise<ChatFactory> {
		return new ChatFactory()
	}

}
