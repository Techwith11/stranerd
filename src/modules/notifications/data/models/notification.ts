import firebase from '@root/services/firebase'

export interface NotificationFromModel {
	id: string
	title: string
	description: string
	seen: boolean
	type: string
	action: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface NotificationToModel {
	title: string
	description: string
	seen: boolean
	type: string
	action: string
}
