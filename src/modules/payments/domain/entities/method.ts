import { extractDate } from '@root/modules/core/validations/sanitizers'

export class MethodEntity {
	public readonly id: string
	public readonly token: string
	public readonly cardType: string
	public readonly maskedNumber: string
	public readonly expires: Date

	constructor({ id, token, cardType, maskedNumber, expirationDate }: MethodConstructorArgs) {
		this.id = id
		this.token = token
		this.cardType = cardType
		this.maskedNumber = maskedNumber
		this.expires = expirationDate
	}

	get expirationDate() { return extractDate(this.expires) }

	get expired() { return this.expires < new Date() }
}

type MethodConstructorArgs = {
	id: string, token: string, cardType: string, maskedNumber: string, expirationDate: Date
}
