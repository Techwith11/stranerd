import { GetClauses } from '@modules/core/data/datasources/base'
import { NotificationFromModel, NotificationToModel } from '../models/notification'

export abstract class NotificationBaseDataSource {
	public abstract create: (user: string, data: NotificationToModel) => Promise<string>
	public abstract get: (user: string, condition?: GetClauses) => Promise<NotificationFromModel[]>
	public abstract listen: (user: string, callback: (documents: NotificationFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
	public abstract find: (user: string, id: string) => Promise<NotificationFromModel | undefined>
	public abstract update: (user: string, id: string, data: Partial<NotificationToModel>) => Promise<string>
	public abstract delete: (user: string, id: string) => Promise<void>
}
