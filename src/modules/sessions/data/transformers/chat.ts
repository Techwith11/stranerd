import { dateToMilliseconds, timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatTransformer {
	public fromJSON(model: ChatFromModel) {
		const { id, content, media, from, readAt, dates: { createdAt } } = model
		return new ChatEntity({
			id,
			content, media, from,
			createdAt: timestampToDate(createdAt)!,
			readAt: timestampToDate(readAt)!
		})
	}

	public toJSON(entity: ChatEntity) :ChatToModel {
		return {
			from: entity.from,
			...(entity.content ? { content: entity.content } : {}) ,
			...(entity.media ? { media: entity.media } : {}),
			...(entity.readAt ? { readAt: dateToMilliseconds(entity.readAt) } : {})
		}
	}

}
