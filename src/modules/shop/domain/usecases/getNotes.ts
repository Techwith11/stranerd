import { INoteRepository } from '@root/modules/shop/domain/irepositories/inote'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetNotesUseCase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (date?: Date) :Promise<NoteEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
		}
		if(date){
			conditions.where = [
				{
					field: 'dates.createdAt',
					condition: '<',
					value: date
				}
			]
		}
		return await this.repository.get(conditions)
	}

}

