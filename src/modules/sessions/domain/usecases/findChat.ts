import { IChatRepository } from '../irepositories/ichat'
import { ChatEntity } from '../entities/chat'

export class FindChatUseCase {
	private repository: IChatRepository

	constructor(repository: IChatRepository) {
		this.repository = repository
	}

	public async call (sessionId: string, id: string) :Promise<ChatEntity | undefined> {
		return await this.repository.find(sessionId, id)
	}

}
