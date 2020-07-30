import BaseEntity from '@root/domains/entities/base'
import { Media } from '@data/models/base'

export default class CourseEntity extends BaseEntity {
    public readonly id: string
    public readonly title: string
    public readonly description: string
    public readonly subject: string
    public readonly module: string
    public readonly userId: string
    public readonly image: Media
    public readonly documents: Media[]
    public readonly hasVideo: boolean
    public readonly video?: Media
    public readonly createdAt: Date
    public readonly updatedAt: Date

    constructor({
        id, title, description, subject, module, userId, image, documents, hasVideo, video, createdAt, updatedAt
    }:{
        id: string, title: string, description: string, subject: string, module: string, userId: string
        image: Media, documents: Media[], hasVideo: boolean, video?: Media, createdAt: Date, updatedAt: Date
    }) {
        super();
        this.id = id
        this.title = title
        this.description = description
        this.subject = subject
        this.module = module
        this.userId = userId
        this.image = image
        this.documents = documents
        this.hasVideo = hasVideo
        this.video = video
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
