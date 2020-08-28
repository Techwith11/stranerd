import { FunctionsService } from '@root/modules/core/services/firebase'
import { RoleBaseDataSource } from '@root/modules/users/data/datasources/role-base'

export class RoleFirebaseDataSource implements RoleBaseDataSource{
	public makeAdmin(data: { id: string }): Promise<void> {
		return FunctionsService.call('makeAdmin', data)
	}

	public makeTutor(data: { id: string; course: string }): Promise<void> {
		return FunctionsService.call('makeTutor', data)
	}

	public removeAdmin(data: { id: string }): Promise<void> {
		return FunctionsService.call('removeAdmin', data)
	}

}
