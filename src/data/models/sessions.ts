import BaseModel  from '@data/models/base'
import firebase from '@root/helpers/firebase'

export default interface SessionModel extends BaseModel {
    id?: string
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
