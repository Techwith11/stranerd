import { GetClauses } from '@modules/core/data/datasources/base'
import { DiscussionFromModel, DiscussionToModel } from '@modules/courses/data/models/discussion'

export abstract class DiscussionBaseDataSource {
	public abstract create: (courseId: string, data: DiscussionToModel) => Promise<string>
	public abstract get: (courseId: string, condition?: GetClauses) => Promise<DiscussionFromModel[]>
	public abstract listen: (courseId: string, callback: (documents: DiscussionFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
}
