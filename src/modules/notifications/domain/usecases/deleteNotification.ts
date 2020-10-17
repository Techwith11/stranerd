import { INotificationRepository } from '../irepositories/inotification'

export class DeleteNotificationUseCase {
	private repository: INotificationRepository

	constructor(repository: INotificationRepository) {
		this.repository = repository
	}

	public async call (userId: string, id: string) :Promise<void> {
		return await this.repository.delete(userId, id)
	}

}
