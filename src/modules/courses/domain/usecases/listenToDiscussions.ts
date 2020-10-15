import { IDiscussionRepository } from '../irepositories/idiscussion'
import { DiscussionEntity } from '../entities/discussion'

export class ListenToDiscussionsUsecase {
	private repository: IDiscussionRepository

	constructor(repository: IDiscussionRepository) {
		this.repository = repository
	}

	public async call (courseId: string, callback: (entities: DiscussionEntity[]) => void) :Promise<() => void > {
		return await this.repository.listen(courseId,callback)
	}

}
