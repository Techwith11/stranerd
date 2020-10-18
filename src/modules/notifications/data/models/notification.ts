import firebase from '@root/services/firebase'
import { Type } from '@modules/notifications/domain/entities/notification'

export interface NotificationFromModel {
	id: string
	title: string
	description: string
	seen: boolean
	type: Type
	action: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface NotificationToModel {
	title: string
	description: string
	seen: boolean
	type: Type
	action: string
}
