import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { NotificationBaseDataSource } from './notification-base'
import { NotificationFromModel, NotificationToModel } from '../models/notification'

export class NotificationFirebaseDataSource implements NotificationBaseDataSource{

	public async create(userId: string, data: NotificationToModel): Promise<string> {
		return await DatabaseService.create(`users/${userId}/notifications`, data)
	}

	public async find(userId: string, id: string): Promise<NotificationFromModel | undefined> {
		return await DatabaseService.get(`users/${userId}/notifications/${id}`) as NotificationFromModel | undefined
	}

	public async get(userId: string, conditions?: GetClauses): Promise<NotificationFromModel[]> {
		return await DatabaseService.get(`users/${userId}/notifications`, conditions) as NotificationFromModel[]
	}

	public async listen(userId: string, callback: (documents: NotificationFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
		const cb = (documents: { [key: string]: NotificationFromModel } ) => {
			const models = Object.entries(documents ?? {}).map((e) => ({ ...e[1], id: e[0] }))
			callback(models)
		}
		return await DatabaseService.listen(`users/${userId}/notifications`, cb, conditions)
	}

	public async update(userId: string, id: string, data: NotificationToModel): Promise<string> {
		await DatabaseService.update(`users/${userId}/notifications/${id}`, data)
		return id
	}

	public async delete(userId: string, id: string): Promise<void> {
		return await DatabaseService.delete(`users/${userId}/notifications/${id}`)
	}

}
