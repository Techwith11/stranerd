import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { dateToTimestamp, timestampToDate } from '@root/core/data/transformers/converters/getFirestoreDate'
import BaseTransformer from '@root/core/data/transformers/base'

export default class PostTransformer implements BaseTransformer<PostEntity, PostFromModel, PostToModel> {
    public fromJSON(model: PostFromModel) {
        const { id, title, body, subject, module, dates: { createdAt }, userId } = model
        return new PostEntity({
            id: id ?? '',
            title, body, subject, module, userId,
            createdAt: timestampToDate(createdAt)!
        })
    }

    public toJSON(entity: PostEntity) {
        return {
            title: entity.title,
            body: entity.body,
            subject: entity.subject,
            module: entity.module,
            userId: entity.userId,
            dates: {
                createdAt: dateToTimestamp(entity.createdAt)
            }
        }
    }

}
