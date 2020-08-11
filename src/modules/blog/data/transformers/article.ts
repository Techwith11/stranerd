import { ArticleFromModel, ArticleToModel } from '@root/modules/blog/data/models/article'
import ArticleEntity from '@root/modules/blog/domain/entities/article'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export default class ArticleTransformer {
	public fromJSON(model: ArticleFromModel) {
		const { id, title, body, image, tags, dates: { createdAt }, userId } = model
		return new ArticleEntity({
			id,
			title, body, userId, tags, image,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: ArticleEntity) :ArticleToModel {
		return {
			title: entity.title,
			body: entity.body,
			image: entity.image,
			tags: entity.tags,
			userId: entity.userId
		}
	}

}
