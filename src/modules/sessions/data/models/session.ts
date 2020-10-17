import firebase from '@root/services/firebase'

export interface SessionFromModel {
	id: string
	student: string
	tutor: string
	duration: number
	accepted: boolean
	price: number
	paid: boolean
	cancelled: {
		tutor: boolean
		student: boolean
	}
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface SessionToModel {
	student?: string
	tutor?: string
	duration?: number
	price?: number
	paid?: boolean
	accepted?: boolean
	cancelled?: {
		tutor?: boolean
		student?: boolean
	}
}
