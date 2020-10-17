import { INotificationRepository } from '../irepositories/inotification'
import { NotificationEntity } from '../entities/notification'

export class ListenToNotificationsUseCase {
    private repository: INotificationRepository

    constructor(repository: INotificationRepository) {
	    this.repository = repository
    }

    public async call (userId: string, callback: (entities: NotificationEntity[]) => void) :Promise<() => void > {
	    const cb = (entities: NotificationEntity[]) => callback(entities.reverse())
	    return await this.repository.listen(userId, cb, { order: { field: 'dates/createdAt', desc: true } })
    }

}
