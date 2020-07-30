import BaseModel, { Media } from '@data/models/base'
import firebase from '@root/helpers/firebase'

export default interface CourseModel extends BaseModel {
    id?: string
    title: string
    description: string
    subject: string
    module: string
    userId: string
    image: Media
    documents: Media[]
    hasVideo: boolean
    video?: Media
    dates: {
        createdAt: firebase.firestore.Timestamp
        updatedAt: firebase.firestore.Timestamp
    }
}
