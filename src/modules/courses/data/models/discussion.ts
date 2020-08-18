import firebase from '@root/services/firebase'

export interface DiscussionFromModel {
	id: string
	body: string
	userId: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface DiscussionToModel {
	body: string
	userId: string
}
