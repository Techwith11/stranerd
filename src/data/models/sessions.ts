import { BaseFromModel, BaseToModel }  from '@data/models/base'
import firebase from '@root/helpers/firebase'

export interface SessionFromModel extends BaseFromModel {
    id: string
    duration: number
    student: string
    tutor: string
    accepted: boolean
    cancelled: {
        student: boolean
        tutor: boolean
    }
    dates: {
        createdAt: firebase.firestore.Timestamp
        endedAt?: firebase.firestore.Timestamp
    }
}

export interface SessionToModel extends BaseToModel {
    duration?: number
    student?: string
    tutor?: string
    accepted?: boolean
    cancelled?: {
        student?: boolean
        tutor?: boolean
    }
    dates?: {
        createdAt?: firebase.firestore.Timestamp
        endedAt?: firebase.firestore.Timestamp
    }
}
