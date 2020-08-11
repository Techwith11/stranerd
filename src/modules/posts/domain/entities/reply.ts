export default class ReplyEntity{
    public readonly id: string
    public readonly body: string
    public readonly userId: string
    public readonly createdAt: Date

    constructor({ id, body, createdAt, userId }: ReplyConstructorArgs) {
        this.id = id
        this.body = body
        this.createdAt = createdAt
        this.userId = userId
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

type ReplyConstructorArgs = { id: string, body: string, createdAt: Date, userId: string }

