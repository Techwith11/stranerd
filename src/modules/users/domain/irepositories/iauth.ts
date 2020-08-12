import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'

export interface IAuthRepository {
	loginWithEmail: (user: AuthUser) => Promise<string>
	loginWithGoogle: () => Promise<string>
	logout: () => Promise<void>
	registerWithEmail: (user: AuthUser) => Promise<string>
	registerOnAuthChangedCallback: (cb: (user: firebase.User | null) => void) => void
	resetPassword: (user: {email: string}) => Promise<void>
	updatePassword: (user: {password: string}) => Promise<void>
}