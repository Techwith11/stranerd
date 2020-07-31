import BaseEntity from '@root/modules/core/domains/entities/base'

export default class ReplyEntity extends BaseEntity{
    public readonly id: string
    public readonly body: string
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, body, createdAt, userId }: ReplyConstructorArgs) {
        super()
        this.id = id
        this.body = body
        this.createdAt = createdAt
        this.userId = userId
    }
}

type ReplyConstructorArgs = { id: string, body: string, createdAt: Date, userId: string }

