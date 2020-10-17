import { Media } from '@modules/core/data/models/base'
import firebase from '@root/services/firebase'

export interface CourseFromModel {
	id: string
	title: string
	description: string
	subject: string
	module: string
	userId: string
	image: Media
	documents: Media[]
	video?: Media
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface CourseToModel {
	title: string
	description: string
	subject: string
	module: string
	userId: string
	image: Media
	documents: Media[]
	video?: Media
}
