import { IRoleRepository } from '@root/modules/users/domain/irepositories/irole'

export class RemoveAdminUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (id: string) : Promise<void> {
		return await this.repository.removeAdmin(id)
	}

}
