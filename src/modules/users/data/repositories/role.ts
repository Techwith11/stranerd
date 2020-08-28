import { IRoleRepository } from '@root/modules/users/domain/irepositories/irole'
import { RoleBaseDataSource } from '@root/modules/users/data/datasources/role-base'

export class RoleRepository implements IRoleRepository{
	private dataSource: RoleBaseDataSource

	constructor(dataSource: RoleBaseDataSource) {
		this.dataSource = dataSource
	}

	public async makeAdmin(id: string) {
		return await this.dataSource.makeAdmin({ id })
	}

	public async makeTutor(id: string, course: string) {
		return await this.dataSource.makeTutor({ id, course })
	}

	public async removeAdmin(id: string) {
		return await this.dataSource.removeAdmin({ id })
	}

}
