import { ITutorQuestionRepository } from '@root/modules/tests/domain/irepositories/itutorQuestion'
import { TutorQuestionEntity } from '@root/modules/tests/domain/entities/tutorQuestion'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetTutorQuestionsByModuleUseCase {
	private repository: ITutorQuestionRepository

	constructor(repository: ITutorQuestionRepository) {
		this.repository = repository
	}

	public async call (subject: string, module: string, date?: Date) :Promise<TutorQuestionEntity[]> {
		const conditions: GetClauses = {
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT),
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			where: [
				{ field: 'subject', condition: '==', value: subject.toLowerCase() },
				{ field: 'module', condition: '==', value: module.toLowerCase() },
			]
		}
		if(date){
			conditions.where!.push({ field: 'dates.createdAt', condition: '<', value: date })
		}
		return await this.repository.get(conditions)
	}

}

