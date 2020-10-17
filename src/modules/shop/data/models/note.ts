import { Media } from '@modules/core/data/models/base'
import firebase from '@root/services/firebase'

export interface NoteFromModel {
	id: string
	title: string
	description: string
	price: number
	userId: string
	image: Media
	document: Media
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface NoteToModel {
	title: string
	description: string
	price: number
	userId: string
	image: Media
	document: Media
}
