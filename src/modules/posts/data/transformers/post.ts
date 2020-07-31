import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export default class PostTransformer {
    public fromJSON(model: PostFromModel) {
        const { id, title, body, tags, dates: { createdAt }, userId } = model
        return new PostEntity({
            id: id ?? '',
            title, body, userId, tags,
            createdAt: timestampToDate(createdAt)!
        })
    }

    public toJSON(entity: PostEntity) :PostToModel {
        return {
            title: entity.title,
            body: entity.body,
            tags: entity.tags,
            userId: entity.userId
        }
    }

}
