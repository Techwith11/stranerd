import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'

export default abstract class AuthBaseDataSource {
	public abstract loginWithEmail: (user: AuthUser) => Promise<string>
	public abstract loginWithGoogle: () => Promise<string>
	public abstract logout: () => Promise<void>
	public abstract registerWithEmail: (user: AuthUser) => Promise<string>
	public abstract registerOnAuthChangedCallback: (cb: (user: firebase.User | null) => void) => void
}
