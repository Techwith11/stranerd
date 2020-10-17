import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource{

	public async find(id: string): Promise<UserFromModel | undefined> {
		return await FirestoreService.find('users', id) as UserFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<UserFromModel[]> {
		return await FirestoreService.get('users', conditions) as UserFromModel[]
	}

	public async listen(callback: (documents: UserFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		return await FirestoreService.listenToMany(callback, 'users', conditions)
	}

}
