import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'
import { Media } from '@root/modules/core/data/models/base'

export abstract class AuthBaseDataSource {
	public abstract loginWithEmail: (user: AuthUser) => Promise<string>
	public abstract loginWithGoogle: () => Promise<string>
	public abstract logout: () => Promise<void>
	public abstract registerWithEmail: (user: AuthUser) => Promise<string>
	public abstract registerOnAuthChangedCallback: (cb: (user: firebase.User | null) => void) => void
	public abstract resetPassword: (user: { email: string}) => Promise<void>
	public abstract updatePassword: (user: { password: string}) => Promise<void>
	public abstract updateProfile: (id: string, user: { name: string, bio: string, image?: Media }) => Promise<void>
}
