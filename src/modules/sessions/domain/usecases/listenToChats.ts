import { IChatRepository } from '../irepositories/ichat'
import { ChatEntity } from '../entities/chat'

export class ListenToChatsUseCase {
    private repository: IChatRepository

    constructor(repository: IChatRepository) {
	    this.repository = repository
    }

    public async call (sessionId: string, callback: (entities: ChatEntity[]) => void) :Promise<() => void > {
	    const cb = (entities: ChatEntity[]) => callback(entities.reverse())
	    return await this.repository.listen(sessionId, cb, { order: { field: 'dates/createdAt', desc: true } })
    }

}
