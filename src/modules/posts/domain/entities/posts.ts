import BaseEntity from '@root/modules/core/domains/entities/base'

export default class PostEntity extends BaseEntity{
    public readonly id: string
    public readonly title: string
    public readonly body: string
    public readonly tags: string[]
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, title, body, tags, createdAt, userId }: PostConstructorArgs) {
        super()
        this.id = id
        this.title = title
        this.body = body
        this.tags = tags
        this.createdAt = createdAt
        this.userId = userId
    }
}

type PostConstructorArgs = { id: string, title: string, body: string, tags: string[], createdAt: Date, userId: string }

