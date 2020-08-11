import { trimToLength, extractTextFromHTML, extractDate } from '@root/modules/core/validations/sanitizers'

export default class PostEntity{
    public readonly id: string
    public readonly title: string
    public readonly body: string
    public readonly subject: string
    public readonly module: string
    public readonly tags: string[]
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, title, body, subject, module, tags, createdAt, userId }: PostConstructorArgs) {
        this.id = id
        this.title = title
        this.body = body
        this.subject = subject
        this.module = module
        this.tags = tags
        this.createdAt = createdAt
        this.userId = userId
    }
    get trimmedBody(){ return trimToLength(extractTextFromHTML(this.body), 200) }

    get createdDate(){return extractDate(this.createdAt) }
}

type PostConstructorArgs = { id: string, title: string, body: string, subject: string, module: string, tags: string[], createdAt: Date, userId: string }

