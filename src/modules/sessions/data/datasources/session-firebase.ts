import { FirestoreService, FunctionsService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SessionBaseDataSource } from '@root/modules/sessions/data/datasources/session-base'
import { SessionFromModel, SessionToModel } from '@root/modules/sessions/data/models/session'

export class SessionFirebaseDataSource implements SessionBaseDataSource{

	public async create(data: SessionToModel): Promise<string> {
		return await FunctionsService.call('startSession', data)
	}

	public async find(id: string): Promise<SessionFromModel | undefined> {
		return await FirestoreService.find('sessions', id) as SessionFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<SessionFromModel[]> {
		return await FirestoreService.get('sessions', conditions) as SessionFromModel[]
	}

	public async update(id: string, data: SessionToModel): Promise<string> {
		return await FirestoreService.update('sessions', id, data)
	}

	public async listen(id: string, callback: (session: (SessionFromModel | undefined)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne(callback, 'sessions', id)
	}

}
