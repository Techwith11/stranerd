export interface ReplyFromModel {
    id: string
    body: string
    userId: string
    dates: {
        createdAt: number
    }
    likes: { [key: string]: boolean }
    dislikes: { [key: string]: boolean }
}

export interface ReplyToModel {
    body: string
    userId: string
    likes: { [key: string]: boolean }
    dislikes: { [key: string]: boolean }
}
