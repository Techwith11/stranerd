import { BaseFromModel, BaseToModel }  from '@data/models/base'
import firebase from '@helpers/firebase'

export interface PostFromModel extends BaseFromModel {
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

export interface PostToModel extends BaseToModel {
    title?: string
    body?: string
    subject?: string
    module?: string
    userId?: string
    dates?: {
        createdAt?: firebase.firestore.Timestamp
    }
}
