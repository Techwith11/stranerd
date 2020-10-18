import { NotificationEntity } from '../entities/notification'
import { GetClauses } from '@modules/core/data/datasources/base'
import { NotificationToModel } from '../../data/models/notification'

export interface INotificationRepository {
	add: (userId: string, data: NotificationToModel) => Promise<string>,
	find: (userId: string, id: string) => Promise<NotificationEntity | undefined>
	get: (userId: string, conditions?: GetClauses) => Promise<NotificationEntity[]>
	listen: (userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
	update: (userId: string, id: string, data: Partial<NotificationToModel>) => Promise<string>,
	delete: (userId: string, id: string) => Promise<void>
}
