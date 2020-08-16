import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { NoteBaseDataSource } from '@root/modules/shop/data/datasources/note-base'
import { NoteFromModel, NoteToModel } from '@root/modules/shop/data/models/note'

export class NoteFirebaseDataSource implements NoteBaseDataSource{

	public async get(conditions?: GetClauses): Promise<NoteFromModel[]> {
		return await FirestoreService.get('notes', conditions) as NoteFromModel[]
	}

	public async delete(id: string): Promise<void> {
		return await FirestoreService.delete('notes', id)
	}

	public async add(data: NoteToModel): Promise<string> {
		return await FirestoreService.create('notes', data)
	}

	public async update(id: string, data: NoteToModel): Promise<string> {
		return await FirestoreService.update('notes', id, data)
	}

	public async find(id: string): Promise<NoteFromModel | undefined> {
		return await FirestoreService.find('notes', id)  as NoteFromModel | undefined
	}

}
