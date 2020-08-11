import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { UserBaseDataSource } from '@root/modules/users/data/datasources/user-base'
import { UserFromModel } from '@root/modules/users/data/models/user'

export class UserFirebaseDataSource implements UserBaseDataSource{

	public async find(id: string): Promise<UserFromModel | undefined> {
		return await FirestoreService.find('users', id) as UserFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<UserFromModel[]> {
		return await FirestoreService.get('users', conditions) as UserFromModel[]
	}

	public async listen(callback: (documents: UserFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		return await FirestoreService.listen(callback, 'users', conditions)
	}

}
