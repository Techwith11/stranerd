import { NoteFromModel, NoteToModel } from '@modules/shop/data/models/note'
import { NoteEntity } from '@modules/shop/domain/entities/note'
import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class NoteTransformer {
	public fromJSON(model: NoteFromModel) :NoteEntity {
		const { id, title, description, price, image, document, userId, dates: { createdAt }} = model
		return new NoteEntity({
			id, title, description, price, userId,
			image, document, createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: NoteEntity) :NoteToModel {
		return {
			title: entity.title,
			description: entity.description,
			price: entity.price,
			userId: entity.userId,
			image: entity.image,
			document: entity.document,
		}
	}
}
