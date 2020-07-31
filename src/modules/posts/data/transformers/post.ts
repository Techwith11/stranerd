import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { dateToTimestamp, timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'
import BaseTransformer from '@root/modules/core/data/transformers/base'

export default class PostTransformer implements BaseTransformer<PostEntity, PostFromModel, PostToModel> {
    public fromJSON(model: PostFromModel) {
        const { id, title, body, subject, module, tags, dates: { createdAt }, userId } = model
        return new PostEntity({
            id: id ?? '',
            title, body, subject, module, userId, tags,
            createdAt: timestampToDate(createdAt)!
        })
    }

    public toJSON(entity: PostEntity) {
        return {
            title: entity.title,
            body: entity.body,
            subject: entity.subject,
            module: entity.module,
            tags: entity.tags,
            userId: entity.userId,
            dates: {
                createdAt: dateToTimestamp(entity.createdAt)
            }
        }
    }

}
