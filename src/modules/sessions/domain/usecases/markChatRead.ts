import { IChatRepository } from '../irepositories/ichat'

export class MarkChatReadUseCase {
	private repository: IChatRepository

	constructor(repository: IChatRepository) {
		this.repository = repository
	}

	public async call (sessionId: string, id: string) :Promise<void> {
		return await this.repository.update(sessionId, id, { readAt: Date.now() })
	}

}
