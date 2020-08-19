import { TutorQuestionFromModel, TutorQuestionToModel } from '@root/modules/tests/data/models/tutorQuestion'
import { TutorQuestionEntity } from '@root/modules/tests/domain/entities/tutorQuestion'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class TutorQuestionTransformer {
	public fromJSON(model: TutorQuestionFromModel) {
		const { id, title, subject, module, level, a, b, c, d, answer, dates: { createdAt }, userId } = model
		return new TutorQuestionEntity({
			id,
			title, subject, module, userId, level,
			a, b, c, d, answer,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: TutorQuestionEntity) :TutorQuestionToModel {
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
