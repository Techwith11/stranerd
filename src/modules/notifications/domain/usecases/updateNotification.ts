import { INotificationRepository } from '../irepositories/inotification'
import { NotificationToModel } from '@modules/notifications/data/models/notification'

export class UpdateNotificationUseCase {
	private repository: INotificationRepository

	constructor(repository: INotificationRepository) {
		this.repository = repository
	}

	public async call (userId: string, id: string, data: NotificationToModel) :Promise<string> {
		return await this.repository.update(userId, id,  data)
	}

}
