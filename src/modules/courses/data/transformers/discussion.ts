import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'
import { DiscussionEntity } from '../../domain/entities/discussion'

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
