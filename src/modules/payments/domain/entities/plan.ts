export class PlanEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly questions: number
	public readonly monthlyPrice: number
	public readonly yearlyPrice: number
	public readonly monthlyId: string
	public readonly yearlyId: string

	constructor({ id, title, description, questions, monthlyId, monthlyPrice, yearlyId, yearlyPrice }: PlanConstructorArgs) {
		this.id = id
		this.title = title
		this.description = description
		this.questions = questions
		this.monthlyId = monthlyId
		this.monthlyPrice = monthlyPrice
		this.yearlyId = yearlyId
		this.yearlyPrice = yearlyPrice
	}

}

type PlanConstructorArgs = {
	id: string, title: string, description: string, questions: number,
	monthlyPrice: number, yearlyPrice: number, monthlyId: string, yearlyId: string
}
