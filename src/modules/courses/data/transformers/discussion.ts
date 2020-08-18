import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'
import { DiscussionFromModel, DiscussionToModel } from '@root/modules/courses/data/models/discussion'
import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'

export class DiscussionTransformer {
	public fromJSON(model: DiscussionFromModel) {
		const { id, body, dates: { createdAt }, userId } = model
		return new DiscussionEntity({
			id,
			body, userId,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: DiscussionEntity) :DiscussionToModel {
		return {
			body: entity.body,
			userId: entity.userId,
		}
	}

}
