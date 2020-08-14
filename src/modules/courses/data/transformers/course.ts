import { CourseFromModel, CourseToModel } from '@root/modules/courses/data/models/course'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class CourseTransformer {
	public fromJSON(model: CourseFromModel) :CourseEntity {
		const { id, title, description, subject, module, image, documents, video, userId, dates: { createdAt }} = model
		return new CourseEntity({
			id, title, description, subject, module, userId,
			image, documents, video,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: CourseEntity) :CourseToModel {
		return {
			title: entity.title,
			description: entity.description,
			subject: entity.subject,
			module: entity.module,
			userId: entity.userId,
			image: entity.image,
			documents: entity.documents,
			video: entity.video
		}
	}
}
