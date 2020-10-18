import { ChatFactory } from '@modules/sessions/domain/factories/chat'

export class GetChatFactoryUseCase {
	public call () :ChatFactory {
		return new ChatFactory()
	}

}
