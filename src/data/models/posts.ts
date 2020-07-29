import BaseModel  from '@data/models/base'
import firebase from '@helpers/firebase'

export default interface PostModel extends BaseModel {
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
