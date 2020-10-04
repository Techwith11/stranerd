import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'
import { Media } from '@root/modules/core/data/models/base'

export interface IAuthRepository {
	loginWithEmail: (user: AuthUser) => Promise<string>
	loginWithGoogle: () => Promise<string>
	logout: () => Promise<void>
	registerWithEmail: (user: AuthUser) => Promise<string>
	registerOnAuthChangedCallback: (cb: (user: firebase.User | null) => void) => void
	resetPassword: (user: {email: string}) => Promise<void>
	updatePassword: (user: {email: string, oldPassword: string,password: string}) => Promise<void>
	updateProfile: (id: string, user: { name: string, bio: string, image?: Media }) => Promise<void>
}
