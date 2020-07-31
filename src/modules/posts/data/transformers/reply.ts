import { dateToTimestamp, timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'
import BaseTransformer from '@root/modules/core/data/transformers/base'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'
import ReplyEntity from '@root/modules/posts/domain/entities/replles'

export default class ReplyTransformer implements BaseTransformer<ReplyEntity, ReplyFromModel, ReplyToModel> {
    public fromJSON(model: ReplyFromModel) {
        const { id, body, dates: { createdAt }, userId } = model
        return new ReplyEntity({
            id: id ?? '',
            body, userId,
            createdAt: timestampToDate(createdAt)!
        })
    }

    public toJSON(entity: ReplyEntity) {
        return {
            body: entity.body,
            userId: entity.userId,
            dates: {
                createdAt: dateToTimestamp(entity.createdAt)
            }
        }
    }

}
