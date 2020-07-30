import BaseTransformer from '@data/transformers/base'
import PostEntity from '@root/domains/entities/posts'
import { PostFromModel, PostToModel } from '@data/models/posts'
import { timestampToDate, dateToTimestamp } from '@data/converters/getFirestoreDate'

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
