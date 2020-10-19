import { SessionFromModel, SessionToModel } from '@root/modules/sessions/data/models/session'
import { SessionEntity } from '@root/modules/sessions/domain/entities/session'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class SessionTransformer {
	public fromJSON(model: SessionFromModel) :SessionEntity {
		const { id, student, tutor, accepted, cancelled, duration, paid, price, reviews, dates: { createdAt }} = model
		return new SessionEntity({
			id, student, tutor, reviews, cancelled, accepted, paid, duration, price,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: SessionEntity) :SessionToModel {
		return {
			student: entity.student,
			tutor: entity.tutor,
			duration: entity.duration,
			price: entity.price,
			paid: entity.paid,
			accepted: entity.accepted,
			cancelled: entity.cancelled,
			reviews: entity.reviews,
		}
	}
}
