import { IChatRepository } from '../irepositories/ichat'
import { ChatFactory } from '@modules/sessions/domain/factories/chat'

export class AddChatUseCase {
	private repository: IChatRepository

	constructor(repository: IChatRepository) {
		this.repository = repository
	}

	public async call (sessionId: string, factory: ChatFactory) :Promise<string> {
		return await this.repository.add(sessionId, await factory.toModel())
	}

}
