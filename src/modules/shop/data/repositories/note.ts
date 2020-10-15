import { INoteRepository } from '@modules/shop/domain/irepositories/inote'
import { NoteBaseDataSource } from '@modules/shop/data/datasources/note-base'
import { GetClauses } from '@modules/core/data/datasources/base'
import { NoteTransformer } from '@modules/shop/data/transformers/note'
import { NoteToModel } from '@modules/shop/data/models/note'

export class NoteRepository implements INoteRepository{
	private dataSource: NoteBaseDataSource
	private transformer: NoteTransformer

	constructor(dataSource: NoteBaseDataSource, transformer: NoteTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

	public async delete(id: string): Promise<void> {
		return await this.dataSource.delete(id)
	}

	public async add(data: NoteToModel): Promise<string> {
		return await this.dataSource.add(data)
	}

	public async update(id: string, data: NoteToModel): Promise<string> {
		return await this.dataSource.update(id, data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		return undefined
	}

}
