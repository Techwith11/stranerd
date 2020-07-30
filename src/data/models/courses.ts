import { BaseFromModel, BaseToModel, Media } from '@data/models/base'
import firebase from '@root/helpers/firebase'

export interface CourseFromModel extends BaseFromModel {
    id: string
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

export interface CourseToModel extends BaseToModel{
    title?: string
    description?: string
    subject?: string
    module?: string
    userId?: string
    image?: Media
    documents?: Media[]
    hasVideo?: boolean
    video?: Media
    dates?: {
        createdAt?: firebase.firestore.Timestamp
        updatedAt?: firebase.firestore.Timestamp
    }
}
