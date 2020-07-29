import BaseEntity from '@root/domains/entities/base'

export default class PostEntity extends BaseEntity {
    public readonly id: string
    public readonly title: string
    public readonly body: string
    public readonly subject: string
    public readonly module: string
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, title, body, subject, module, createdAt, userId }: { id: string, title: string, body: string, subject: string, module: string, createdAt: Date, userId: string }) {
        super()
        this.id = id ?? null
        this.title = title
        this.body = body
        this.subject = subject
        this.module = module
        this.createdAt = createdAt
        this.userId = userId
    }
}
