import firebase from '@root/services/firebase'

export interface MethodFromModel {
	id: string
	token: string
	cardType: string
	maskedNumber: string
	expirationMonth: string
	expirationYear: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}
