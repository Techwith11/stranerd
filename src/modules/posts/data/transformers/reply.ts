import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'
import { ReplyEntity } from '@root/modules/posts/domain/entities/reply'

export class ReplyTransformer {
	public fromJSON(model: ReplyFromModel) {
		const { id, body, dates: { createdAt }, votes, userId } = model
		return new ReplyEntity({
			id, body, userId, votes,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: ReplyEntity) :ReplyToModel {
		return {
			body: entity.body,
			userId: entity.userId,
			votes: entity.votes
		}
	}

}
