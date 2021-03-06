import { IQuestionRepository } from '../irepositories/iquestion'
import { QuestionEntity } from '../entities/question'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetTutorQuestionsByModuleUseCase {
	private repository: IQuestionRepository

	constructor(repository: IQuestionRepository) {
		this.repository = repository
	}

	public async call (subject: string, module: string, date?: Date) :Promise<QuestionEntity[]> {
		const conditions: GetClauses = {
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT) + 1,
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

