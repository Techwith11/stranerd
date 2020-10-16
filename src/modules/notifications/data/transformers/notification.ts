import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'
import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class NotificationTransformer {
	public fromJSON(model: NotificationFromModel) {
		const { id, title, description, action, type, seen, dates: { createdAt } } = model
		return new NotificationEntity({
			id,
			title, description, action, type, seen,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: NotificationEntity) :NotificationToModel {
		return {
			title: entity.title,
			description: entity.description,
			action: entity.action,
			type: entity.type,
			seen: entity.seen
		}
	}

}
