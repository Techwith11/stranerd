import firebase from '@root/helpers/firebase'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp | undefined) :Date | undefined => {
    return timestamp?.toDate() ?? undefined
}

export const dateToTimestamp = (date: Date) :firebase.firestore.Timestamp => {
    return firebase.firestore.Timestamp.fromDate(date)
}
