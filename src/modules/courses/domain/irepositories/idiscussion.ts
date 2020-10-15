import { GetClauses } from '@modules/core/data/datasources/base'
import { DiscussionToModel } from '@modules/courses/data/models/discussion'
import { DiscussionEntity } from '@modules/courses/domain/entities/discussion'

export interface IDiscussionRepository {
	add: (courseId: string, data: DiscussionToModel) => Promise<string>,
	get: (courseId:string, conditions?: GetClauses) => Promise<DiscussionEntity[]>
	listen: (courseId: string, callback: (entities: DiscussionEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
