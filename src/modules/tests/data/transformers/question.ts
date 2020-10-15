import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'
import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class QuestionTransformer {
	public fromJSON(model: QuestionFromModel) {
		const { id, title, subject, module, level, a, b, c, d, answer, dates: { createdAt }, userId } = model
		return new QuestionEntity({
			id,
			title, subject, module, userId, level,
			a, b, c, d, answer,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: QuestionEntity) :QuestionToModel {
		return {
			title: entity.title,
			subject: entity.subject,
			module: entity.module,
			level: entity.level,
			a: entity.a,
			b: entity.b,
			c: entity.c,
			d: entity.d,
			answer: entity.answer,
			userId: entity.userId
		}
	}

}
