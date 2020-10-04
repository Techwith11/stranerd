import { IAuthRepository } from '@root/modules/users/domain/irepositories/iauth'
import { AuthBaseDataSource } from '@root/modules/users/data/datasources/auth-base'
import { AuthUser } from '@root/modules/users/domain/entities/auth'
import firebase from '@root/services/firebase'
import { Media } from '@root/modules/core/data/models/base'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor(dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	public async loginWithEmail(user: AuthUser): Promise<string> {
		return await this.dataSource.loginWithEmail(user)
	}

	public async loginWithGoogle(): Promise<string> {
		return await this.dataSource.loginWithGoogle()
	}

	public async logout(): Promise<void> {
		return await this.dataSource.logout()
	}

	public async registerWithEmail(user: AuthUser): Promise<string> {
		return await this.dataSource.registerWithEmail(user)
	}

	public registerOnAuthChangedCallback(cb: (user: firebase.User | null) => void): void {
		return this.dataSource.registerOnAuthChangedCallback(cb)
	}

	public async resetPassword(user: { email: string }): Promise<void> {
		return await this.dataSource.resetPassword(user)
	}

	public async updatePassword(user: { email: string, oldPassword: string, password: string }): Promise<void> {
		return await this.dataSource.updatePassword(user)
	}

	public async updateProfile(id: string, user: { name: string; bio: string; image?: Media }): Promise<void> {
		return await this.dataSource.updateProfile(id, user)
	}

}
