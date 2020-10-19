export interface TransactionFromModel {
	id: string
	amount: string
	status: string
	type: string
	creditCard: {
		maskedNumber: string
	}
	dates: {
		createdAt: number
	}
}
