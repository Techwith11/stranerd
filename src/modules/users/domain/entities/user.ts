import { Media } from '@modules/core/data/models/base'
import firebase from '@root/services/firebase'
import { DEFAULT_IMAGE_URL } from '@modules/core/services/uploader'

export class UserEntity{
	public readonly id: string
	public readonly roles: UserRoles

	public readonly userBio: UserBio
	public readonly tutor: TutorInfo | undefined
	public readonly registeredAt: Date
	public readonly account: UserAccount

	constructor({ id, bio, roles, tutor, dates, account }: UserConstructorArgs) {
		this.id = id
		this.userBio = bio
		this.roles = roles
		if(roles.isTutor){
			this.tutor = tutor
		}
		this.registeredAt = dates.registeredAt

		this.account = account
	}

	get name(){ return this.userBio.name }
	get email(){ return this.userBio.email }
	get bio(){ return this.userBio.bio }
	get image(){ return this.userBio.image?.link ||  DEFAULT_IMAGE_URL }

	get teachableCourses(){
		if(!this.roles.isTutor) return []
		return this.tutor?.courses.filter((course) => {
			return this.tutor?.levels?.[course]! > 0
		}) ?? []
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	tutor?: TutorInfo
	dates: { registeredAt: Date }
	account: UserAccount
}

export interface UserBio {
	name: string
	email: string
	bio: string
	image: Media
}
export interface UserRoles {
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
export interface TutorInfo {
	canTeach: boolean
	courses: string[]
	rating: number
	reviews: number
	levels: { [key: string]: number }
	qualification: string
	upgrades: {
		[key:string]: {
			[key:number]: {
				score: number
				takenAt:  firebase.firestore.Timestamp
				passed: boolean
			}
		}
	}
}
export interface UserAccount {
	questions: number
	customer_id: string
	subscription?: Subscription
}
export interface Subscription {
	id: string
	price: string
	planId: string
	status: string
}
