import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'
import { PostEntity } from '@root/modules/posts/domain/entities/post'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class PostTransformer {
	public fromJSON(model: PostFromModel) {
		const { id, title, body, subject, module, tags, dates: { createdAt }, userId } = model
		return new PostEntity({
			id,
			title, body, userId, tags, subject, module,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: PostEntity) :PostToModel {
		return {
			title: entity.title,
			body: entity.body,
			subject: entity.subject,
			module: entity.module,
			tags: entity.tags,
			userId: entity.userId
		}
	}

}
