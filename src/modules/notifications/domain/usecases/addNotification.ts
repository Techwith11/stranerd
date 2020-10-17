import { INotificationRepository } from '../irepositories/inotification'
import { NotificationToModel } from '@modules/notifications/data/models/notification'

export class AddNotificationUseCase {
	private repository: INotificationRepository

	constructor(repository: INotificationRepository) {
		this.repository = repository
	}

	public async call (userId: string, data: NotificationToModel) :Promise<string> {
		return await this.repository.add(userId, data)
	}

}
