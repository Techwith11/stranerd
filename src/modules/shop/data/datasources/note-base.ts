import { GetClauses } from '@modules/core/data/datasources/base'
import { NoteFromModel, NoteToModel } from '../models/note'

export abstract class NoteBaseDataSource {
	public abstract add: (data: NoteToModel) => Promise<string>
	public abstract update: (id: string, data: NoteToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<NoteFromModel[]>
	public abstract find: (id: string) => Promise<NoteFromModel | undefined>
	public abstract delete: (id: string) => Promise<void>
}
