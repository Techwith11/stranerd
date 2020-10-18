import { ChatFactory } from '../factories/chat'

export class GetChatFactoryUseCase {
	public call () :ChatFactory {
		return new ChatFactory()
	}

}
