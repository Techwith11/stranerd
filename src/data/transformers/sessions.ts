import BaseTransformer from '@data/transformers/base'
import SessionEntity from '@root/domains/entities/sessions'
import { SessionFromModel, SessionToModel } from '@data/models/sessions'
import { timestampToDate, dateToTimestamp } from '@data/converters/getFirestoreDate'

export default class SessionTransformer implements BaseTransformer<SessionEntity, SessionFromModel, SessionToModel> {
    public fromJSON(model: SessionFromModel) {
        const { id, tutor, student, duration, accepted,
            cancelled: { student: studentCancelled, tutor: tutorCancelled}, dates: { createdAt, endedAt }
        } = model
        return new SessionEntity({
            id: id ?? '',
            tutor, student, duration, accepted, studentCancelled, tutorCancelled,
            createdAt: timestampToDate(createdAt)!,
            endedAt: timestampToDate(endedAt)
        })
    }

    public toJSON(entity: SessionEntity) {
        return {
            tutor: entity.tutor,
            student: entity.student,
            duration: entity.duration,
            accepted: entity.accepted,
            cancelled: {
                student: entity.studentCancelled,
                tutor: entity.tutorCancelled
            },
            dates: {
                createdAt: dateToTimestamp(entity.createdAt),
                endedAt: dateToTimestamp(entity.endedAt)
            }
        }
    }

}
