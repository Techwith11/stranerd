export class MethodEntity {
	public readonly id: string
	public readonly token: string
	public readonly type: string
	public readonly isCard: boolean
	public readonly image: string
	public readonly maskedNumber: string
	public readonly expires: Date
	public readonly createdAt: Date

	constructor({ id, token, imageUrl, maskedNumber, expirationDate, createdAt }: MethodConstructorArgs) {
		this.id = id
		this.token = token
		this.maskedNumber = maskedNumber
		this.expires = expirationDate
		this.createdAt = createdAt
		this.image = imageUrl
		const type = stripOutType(imageUrl)
		this.type = PAYMENT_TYPES.includes(type) ? type : PAYMENT_TYPES[0]
		this.isCard = CARD_TYPES.includes(this.type)
	}

	get expirationDate() {
		const year = this.expires.getFullYear()
		const month = this.expires.getMonth() + 1
		const formattedMonth = `${month > 9 ? '' : '0'}${month}`
		return `${formattedMonth}/${year}`
	}

	get expired() { return this.isCard? this.expires < new Date() : false }
}

type MethodConstructorArgs = {
	id: string, token: string, imageUrl: string, maskedNumber: string, expirationDate: Date, createdAt: Date
}

const PAYMENT_TYPES = ['visa', 'mastercard', 'maestro', 'discover', 'jcb', 'paypal']
const CARD_TYPES = ['visa', 'mastercard', 'maestro', 'discover','jcb']

const stripOutType = (url: string) => {
	const splitOnSlashes = url?.split('/')
	const last = splitOnSlashes?.[splitOnSlashes?.length - 1]
	const splitOnDot = last?.split('.')
	return splitOnDot[0] ?? ''
}
