import firebase from '@root/helpers/firebase'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp) :Date => {
    return timestamp?.toDate()
}

export const dateToTimestamp = (date: Date) :firebase.firestore.Timestamp => {
    return firebase.firestore.Timestamp.fromDate(date)
}
