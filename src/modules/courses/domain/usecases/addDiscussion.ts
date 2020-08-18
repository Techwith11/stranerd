import { IDiscussionRepository } from '@root/modules/courses/domain/irepositories/idiscussion'
import { DiscussionFactory } from '@root/modules/courses/domain/factories/discussion'

export class AddDiscussionUsecase {
	private repository: IDiscussionRepository

	constructor(repository: IDiscussionRepository) {
		this.repository = repository

	}

	public async call (courseId: string, factory: DiscussionFactory) :Promise<string> {
		return await this.repository.add(courseId, await factory.toModel())
	}

}
