import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { DiscussionBaseDataSource } from '@root/modules/courses/data/datasources/discussion-base'
import { DiscussionFromModel, DiscussionToModel } from '@root/modules/courses/data/models/discussion'

export class DiscussionFirebaseDataSource implements DiscussionBaseDataSource{

	public async create(courseId: string, data: DiscussionToModel): Promise<string> {
		return await FirestoreService.create(`courses/${courseId}/discussions`, data)
	}

	public async get(courseId: string, conditions?: GetClauses): Promise<DiscussionFromModel[]> {
		return await FirestoreService.get(`courses/${courseId}/discussions`,conditions) as DiscussionFromModel[]
	}

	public async listen(courseId: string, callback: (documents: DiscussionFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		return await FirestoreService.listen(callback, `courses/${courseId}/discussions`, conditions)
	}

}
