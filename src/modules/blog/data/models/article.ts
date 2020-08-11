import firebase from '@root/services/firebase'
import { Media } from '@root/modules/core/data/models/base'

export interface ArticleFromModel {
	id: string
	title: string
	body: string
	image: Media
	tags: string[]
	userId: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface ArticleToModel {
	title: string
	body: string
	image: Media
	tags: string[]
	userId: string
}
