import firebase from '@root/services/firebase'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp | undefined) :Date | undefined => {
	return timestamp?.toDate() ?? undefined
}

export const dateToTimestamp = (date: Date) :firebase.firestore.Timestamp => {
	return firebase.firestore.Timestamp.fromDate(date)
}

export const serverTimeStamp = () => {
	return firebase.firestore.FieldValue.serverTimestamp()
}
