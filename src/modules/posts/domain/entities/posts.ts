export default class PostEntity{
    public readonly id: string
    public readonly title: string
    public readonly body: string
    public readonly tags: string[]
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, title, body, tags, createdAt, userId }: PostConstructorArgs) {
        this.id = id
        this.title = title
        this.body = body
        this.tags = tags
        this.createdAt = createdAt
        this.userId = userId
    }

    get trimmedBody(){
        let body = this.body.replace(/<[^>]+>/g, '')
        if(body.length < 200){ return body }
        const index = body.indexOf(' ', 200)
        return `${body.slice(0, index)}...`
    }

    get createdDate(){
        const date = this.createdAt
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
        if(date > today){
            return date.toTimeString().slice(0,5)
        }else if(date > yesterday){
            return 'Yesterday'
        }else{
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
        }
    }
}

type PostConstructorArgs = { id: string, title: string, body: string, tags: string[], createdAt: Date, userId: string }

