import BaseTransformer from '@data/transformers/base'
import CourseEntity from '@root/domains/entities/courses'
import CourseModel from '@data/models/courses'
import { dateToTimestamp, timestampToDate } from '@data/converters/getFirestoreDate'

export class CourseTransformer implements BaseTransformer<CourseEntity, CourseModel> {
    public fromJSON(model: CourseModel) {
        const { id, title, description, subject, module,
            image, documents, hasVideo, video,
            dates: { createdAt, updatedAt }, userId
        } = model
        return new CourseEntity({
            id: id ?? '',
            title, description, subject, module, userId,
            image, documents, hasVideo, video,
            createdAt: timestampToDate(createdAt)!, updatedAt: timestampToDate(updatedAt)!
        });
    }

    public toJSON(entity: CourseEntity) {
        return {
            title: entity.title,
            description: entity.description,
            subject: entity.subject,
            module: entity.module,
            userId: entity.userId,
            image: entity.image,
            documents: entity.documents,
            hasVideo: entity.hasVideo,
            ...( entity.video ? { video: entity.video} : {}),
            dates: {
                createdAt: dateToTimestamp(entity.createdAt),
                updatedAt: dateToTimestamp(entity.updatedAt)
            }
        };
    }

}
