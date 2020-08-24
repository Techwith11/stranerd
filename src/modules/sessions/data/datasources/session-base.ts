import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SessionFromModel, SessionToModel } from '@root/modules/sessions/data/models/session'

export abstract class SessionBaseDataSource {
	public abstract create: (data: SessionToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<SessionFromModel[]>
	public abstract listen: (id: string, callback: (session: SessionFromModel | undefined) => void) => Promise<() => void>
	public abstract find: (id: string) => Promise<SessionFromModel | undefined>
	public abstract update: (id: string, data: SessionToModel) => Promise<string>
}
