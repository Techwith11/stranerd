export class SessionEntity {
	public readonly id: string
	public readonly student: string
	public readonly tutor: string
	public readonly duration: number
	public readonly price: number
	public readonly paid: boolean
	public readonly accepted: boolean
	public readonly createdAt: Date
	public readonly cancelled: { student: boolean, tutor: boolean }
	public readonly reviews: {
		student: { rating?: number, comment?: string }
		tutor: { rating?: number, comment?: string }
	}

	constructor({ id, student, tutor, duration, price, paid, accepted, createdAt, cancelled, reviews }: SessionConstructorArgs) {
		this.id = id
		this.student = student
		this.tutor = tutor
		this.duration = duration
		this.price = price
		this.paid = paid
		this.accepted = accepted
		this.createdAt = createdAt
		this.cancelled = cancelled
		this.reviews = reviews
	}

}

type SessionConstructorArgs = {
	id: string, student: string, tutor: string, duration: number, price: number, paid: boolean,
	accepted: boolean, createdAt: Date, cancelled: { tutor: boolean, student: boolean },
	reviews: {
		student: {
			rating?: number
			comment?: string
		}
		tutor: {
			rating?: number
			comment?: string
		}
	}
}
