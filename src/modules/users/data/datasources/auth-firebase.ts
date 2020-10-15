import { AuthBaseDataSource } from '@modules/users/data/datasources/auth-base'
import { AuthUser } from '@modules/users/domain/entities/auth'
import firebase, { auth } from '@root/services/firebase'
import { FirestoreService } from '@modules/core/services/firebase'
import { Media } from '@modules/core/data/models/base'

export class AuthFirebaseDataSource implements AuthBaseDataSource{
	public async loginWithEmail({ email, password }: AuthUser): Promise<string> {
		const record = await auth.signInWithEmailAndPassword(email, password)
		//TODO: catch possible errors
		return record.user?.uid ?? ''
	}

	public async loginWithGoogle(): Promise<string> {
		const googleProvider = new firebase.auth.GoogleAuthProvider()
		const record = await auth.signInWithPopup(googleProvider)
		//TODO: catch possible errors
		await FirestoreService.update('users', record.user?.uid ?? '', {} )
		return record.user?.uid ?? ''
	}

	public async logout(): Promise<void> {
		await auth.signOut()
	}

	public async registerWithEmail({ name, email, password }: AuthUser): Promise<string> {
		const record = await auth.createUserWithEmailAndPassword(email, password)
		//TODO: catch possible errors
		await record.user?.updateProfile({ displayName: name })
		await FirestoreService.update('users', record.user?.uid ?? '', { bio: { name } })
		return record.user?.uid ?? ''
	}

	public registerOnAuthChangedCallback(cb: (user: firebase.User | null) => void): void {
		//TODO: test for production
		auth.onAuthStateChanged(cb)
	}

	public async resetPassword(user: { email: string }): Promise<void> {
		return await auth.sendPasswordResetEmail(user.email)
	}

	public async updatePassword(user: { email: string, oldPassword: string, password: string }): Promise<void> {
		try{
			await auth.signInWithEmailAndPassword(user.email, user.oldPassword)
		}catch(error){
			throw Error('Invalid login credentials')
		}
		await auth.currentUser?.updatePassword(user.password)
		//TODO: catch possible errors
	}

	public async updateProfile(id: string, bio: { name: string; bio: string; image?: Media }): Promise<void> {
		await FirestoreService.update('users', id, { bio })
	}

}
