import { extractDate } from '@root/modules/core/validations/sanitizers'

export class TransactionEntity {
	public readonly id: string
	public readonly status: string
	public readonly amount: number
	public readonly type: string
	public readonly createdAt: Date
	public readonly creditCard: { maskedNumber: string }

	constructor({ id, status, amount, type, createdAt, creditCard }: TransactionConstructorArgs) {
		this.id = id
		this.status = status
		this.amount = amount
		this.type = type
		this.createdAt = createdAt
		this.creditCard = creditCard
	}

	get createdDate() { return extractDate(this.createdAt) }

	get successful() { return this.status === 'authorized' }
}

type TransactionConstructorArgs = {
	id: string, status: string, amount: number, type: string, createdAt: Date,
	creditCard: { maskedNumber: string }
}
