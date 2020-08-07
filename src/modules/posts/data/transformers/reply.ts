import {
    dateToTimestamp,
    serverTimeStamp,
    timestampToDate
} from '@root/modules/core/data/transformers/converters/getFirestoreDate'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'
import ReplyEntity from '@root/modules/posts/domain/entities/replies'

export default class ReplyTransformer {
    public fromJSON(model: ReplyFromModel) {
        const { id, body, dates: { createdAt }, userId } = model
        return new ReplyEntity({
            id: id ?? '',
            body, userId,
            createdAt: timestampToDate(createdAt)!
        })
    }

    public toJSON(entity: ReplyEntity) :ReplyToModel {
        return {
            body: entity.body,
            userId: entity.userId,
            dates: {
                createdAt: serverTimeStamp()
            }
        }
    }

}
