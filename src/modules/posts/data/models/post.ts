import firebase from '@root/services/firebase'

export interface PostFromModel {
    id: string
    title: string
    body: string
    subject: string
    module: string
    userId: string
    dates: {
        createdAt: firebase.firestore.Timestamp
    }
}

export interface PostToModel {
    title: string
    body: string
    subject: string
    module: string
    userId: string
    dates?: {
        createdAt: firebase.firestore.Timestamp
    }
}
