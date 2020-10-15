import { INotificationRepository } from '../../domain/irepositories/inotification'
import { NotificationBaseDataSource } from '../datasources/notification-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { NotificationTransformer } from '../transformers/notification'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationRepository implements INotificationRepository {
	private dataSource: NotificationBaseDataSource
	private transformer: NotificationTransformer

	constructor(dataSource: NotificationBaseDataSource, transformer: NotificationTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(userId: string, data: NotificationToModel) {
		return await this.dataSource.create(userId, data)
	}

	public async find(userId: string, id: string) {
		const model = await this.dataSource.find(userId, id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(userId: string, conditions?: GetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map((model: NotificationFromModel) => this.transformer.fromJSON(model))
	}

	public async listen(userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: GetClauses) {
		const listenCB = (documents: NotificationFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}

	public async update(userId: string, id: string, data: NotificationToModel) {
		return await this.dataSource.update(userId, id, data)
	}

	public async delete(userId: string, id: string) {
		return await this.dataSource.delete(userId, id)
	}

}
