import { INotificationRepository } from '../irepositories/inotification'
import { NotificationEntity } from '@modules/notifications/domain/entities/notification'

export class FindNotificationUseCase {
	private repository: INotificationRepository

	constructor(repository: INotificationRepository) {
		this.repository = repository
	}

	public async call (userId: string, id: string) :Promise<NotificationEntity | undefined> {
		return await this.repository.find(userId, id)
	}

}
