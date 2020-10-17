export abstract class IPaymentRepository {
	public abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	public abstract createMethod: (userId: string, nonce: string) => Promise<{ success: boolean, token: string | undefined }>
	public abstract removeMethod: (userId: string, methodId: string) => Promise<boolean>
	public abstract makePayment: (userId: string, amount: number, token: string) => Promise<boolean>
	public abstract subscribeToPlan: (userId: string, planId: string, token: string) => Promise<boolean>
	public abstract updateMethodForSubscription: (userId: string, token: string) => Promise<boolean>
	public abstract cancelSubscription: (userId: string) => Promise<boolean>
}
