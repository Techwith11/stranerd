export interface MethodFromModel {
	id: string
	token: string
	imageUrl: string
	maskedNumber: string
	expirationMonth: string
	expirationYear: string
	dates: {
		createdAt: number
	}
}
