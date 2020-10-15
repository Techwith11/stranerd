import { IRoleRepository } from '@modules/users/domain/irepositories/irole'

export class MakeAdminUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (id: string) : Promise<void> {
		return await this.repository.makeAdmin(id)
	}

}
