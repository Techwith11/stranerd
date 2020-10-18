import { INotificationRepository } from '../irepositories/inotification'

export class ChangeNotificationSeenUseCase {
	private repository: INotificationRepository

	constructor(repository: INotificationRepository) {
		this.repository = repository
	}

	public async call (userId: string, id: string, seen: boolean) :Promise<string> {
		return await this.repository.update(userId, id,  { seen })
	}

}
