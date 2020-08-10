import firebase from '@root/services/firebase'
import { TutorInfo, UserAccount, UserBio, UserRoles } from '@root/modules/users/domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: {
		registeredAt: firebase.firestore.Timestamp
	}
	tutor?: TutorInfo
	account: UserAccount
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	tutor?: TutorInfo
	account: UserAccount
}
