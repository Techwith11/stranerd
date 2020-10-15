import { ArticleFromModel, ArticleToModel } from '@modules/blog/data/models/article'
import { ArticleEntity } from '@modules/blog/domain/entities/article'
import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class ArticleTransformer {
	public fromJSON(model: ArticleFromModel) {
		const { id, title, body, image: imageData, tags, dates: { createdAt }, userId } = model
		return new ArticleEntity({
			id,
			title, body, userId, tags, imageData,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: ArticleEntity) :ArticleToModel {
		return {
			title: entity.title,
			body: entity.body,
			image: entity.imageData,
			tags: entity.tags,
			userId: entity.userId
		}
	}

}
