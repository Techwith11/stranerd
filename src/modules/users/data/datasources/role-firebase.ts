import { FunctionsService } from '@root/modules/core/services/firebase'
import { RoleBaseDataSource } from '@root/modules/users/data/datasources/role-base'

export class RoleFirebaseDataSource implements RoleBaseDataSource{
	public async makeAdmin(data: { id: string }) {
		return await FunctionsService.call('makeAdmin', data)
	}

	public async makeTutor(data: { id: string; course: string }) {
		return await FunctionsService.call('makeTutor', data)
	}

	public async removeAdmin(data: { id: string }) {
		return await FunctionsService.call('removeAdmin', data)
	}

	public async subscribeToMailingList(data: { email: string }) {
		return await FunctionsService.call('subscribeToMailingList', data)
	}

}
