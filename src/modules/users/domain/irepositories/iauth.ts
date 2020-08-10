import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'

export default interface IAuthRepository {
	loginWithEmail: (user: AuthUser) => Promise<string>
	loginWithGoogle: () => Promise<string>
	logout: () => Promise<void>
	registerWithEmail: (user: AuthUser) => Promise<string>
	registerOnAuthChangedCallback: (cb: (user: firebase.User | null) => void) => void
}
