import AuthBaseDataSource from '@root/modules/users/data/datasources/auth-base'
import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase, { auth } from '@root/services/firebase'

export default class AuthFirebaseDataSource implements AuthBaseDataSource{
	public async loginWithEmail({ email, password }: AuthUser): Promise<string> {
		const record = await auth.signInWithEmailAndPassword(email, password)
		//TODO: catch possible errors
		return record.user?.uid ?? ''
	}

	public async loginWithGoogle(): Promise<string> {
		const googleProvider = new firebase.auth.GoogleAuthProvider()
		const record = await auth.signInWithPopup(googleProvider)
		//TODO: catch possible errors
		return record.user?.uid ?? ''
	}

	public async logout(): Promise<void> {
		await auth.signOut()
	}

	public async registerWithEmail({ name, email, password }: AuthUser): Promise<string> {
		const record = await auth.createUserWithEmailAndPassword(email, password)
		//TODO: catch possible errors
		return record.user?.uid ?? ''
	}

	public registerOnAuthChangedCallback(cb: (user: firebase.User | null) => void): void {
		auth.onAuthStateChanged(cb)
	}

}
