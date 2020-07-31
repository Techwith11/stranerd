import firebase from '@root/services/firebase'

export interface ReplyFromModel {
    id: string
    body: string
    userId: string
    dates: {
        createdAt: firebase.firestore.Timestamp
    }
}

export interface ReplyToModel {
    body: string
    userId: string
}
