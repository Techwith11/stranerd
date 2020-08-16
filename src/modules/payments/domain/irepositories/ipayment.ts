export abstract class IPaymentRepository {
	public abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	public abstract createMethod: (userId: string, nonce: string) => Promise<boolean>
	public abstract removeMethod: (userId: string, methodId: string) => Promise<boolean>
	public abstract makePayment: (userId: string, amount: string, token: string) => Promise<boolean>
	public abstract subscribeToPlan: (userId: string, planId: string, token: string) => Promise<boolean>
	public abstract updateMethodForSubscription: (userId: string, token: string) => Promise<boolean>
	public abstract cancelSubscription: (userId: string) => Promise<boolean>
}
