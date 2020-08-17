import { IUserRepository } from '@root/modules/users/domain/irepositories/iuser'
import { UserBaseDataSource } from '@root/modules/users/data/datasources/user-base'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { UserTransformer } from '@root/modules/users/data/transformers/user'
import { UserFromModel } from '@root/modules/users/data/models/user'
import { UserEntity } from '@root/modules/users/domain/entities/user'

export class UserRepository implements IUserRepository{
	private dataSource: UserBaseDataSource
	private transformer: UserTransformer

	constructor(dataSource: UserBaseDataSource, transformer: UserTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: UserFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(callback: (entities: UserEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: UserFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(listenCB, conditions)
	}

}
