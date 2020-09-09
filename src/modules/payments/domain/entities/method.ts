export class MethodEntity {
	public readonly id: string
	public readonly token: string
	public readonly cardType: string
	public readonly maskedNumber: string
	public readonly expires: Date
	public readonly createdAt: Date

	constructor({ id, token, cardType, maskedNumber, expirationDate, createdAt }: MethodConstructorArgs) {
		this.id = id
		this.token = token
		this.cardType = cardType
		this.maskedNumber = maskedNumber
		this.expires = expirationDate
		this.createdAt = createdAt
	}

	get expirationDate() {
		const year = this.expires.getFullYear()
		const month = this.expires.getMonth() + 1
		const formattedMonth = `${month > 9 ? '' : '0'}${month}`
		return `${formattedMonth}/${year}`
	}

	get expired() { return this.expires < new Date() }
}

type MethodConstructorArgs = {
	id: string, token: string, cardType: string, maskedNumber: string, expirationDate: Date, createdAt: Date
}
