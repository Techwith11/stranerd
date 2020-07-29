import firebase from '@root/helpers/firebase'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp) :Date => {
    const milliseconds = timestamp.seconds * 1000
    return new Date(milliseconds)
}

export const dateToTimestamp = (date: Date) :firebase.firestore.Timestamp => {
    return firebase.firestore.Timestamp.fromDate(date)
}
