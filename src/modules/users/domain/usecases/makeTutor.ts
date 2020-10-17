import { IRoleRepository } from '../irepositories/irole'

export class MakeTutorUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (id: string, course: string) : Promise<void> {
		return await this.repository.makeTutor(id, course)
	}

}
