import firebase from '@root/services/firebase'

export interface ReplyFromModel {
    id: string
    body: string
    userId: string
    dates: {
        createdAt: firebase.firestore.Timestamp
    }
    votes: { [key: string]: boolean }
    likes: { [key: string]: boolean }
    dislikes: { [key: string]: boolean }
}

export interface ReplyToModel {
    body: string
    userId: string
    votes: { [key: string]: boolean }
    likes: { [key: string]: boolean }
    dislikes: { [key: string]: boolean }
}
