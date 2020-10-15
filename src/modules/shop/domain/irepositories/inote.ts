import { GetClauses } from '@modules/core/data/datasources/base'
import { NoteEntity } from '@modules/shop/domain/entities/note'
import { NoteToModel } from '@modules/shop/data/models/note'

export interface INoteRepository {
	add: (data: NoteToModel) => Promise<string>
	update: (id:string, data: NoteToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<NoteEntity[]>
	find: (id: string) => Promise<NoteEntity | undefined>
	delete: (id: string) => Promise<void>
}
