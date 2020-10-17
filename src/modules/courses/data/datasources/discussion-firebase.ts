import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { DiscussionBaseDataSource } from '../datasources/discussion-base'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'

export class DiscussionFirebaseDataSource implements DiscussionBaseDataSource{

	public async create(courseId: string, data: DiscussionToModel): Promise<string> {
		return await DatabaseService.create(`courses/${courseId}/discussions`, data)
	}

	public async get(courseId: string, conditions?: GetClauses): Promise<DiscussionFromModel[]> {
		const docs = await DatabaseService.get(`courses/${courseId}/discussions`, conditions) as { [key: string]: DiscussionFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}

	public async listen(courseId: string, callback: (documents: DiscussionFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		const cb = (documents: { [key: string]: DiscussionFromModel } ) => {
			const models = Object.entries(documents ?? {}).map((e) => ({ ...e[1], id: e[0] }))
			callback(models)
		}
		return await DatabaseService.listen(`courses/${courseId}/discussions`, cb, conditions)
	}

}
