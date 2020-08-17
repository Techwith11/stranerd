export abstract class PaymentBaseDataSource {
	public abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	public abstract createMethod: (data: { id: string, nonce: string }) => Promise<boolean>
	public abstract removeMethod: (data: { user: string, id: string }) => Promise<boolean>
	public abstract makePayment: (data: { id: string, amount: number, token: string }) => Promise<boolean>
	public abstract subscribeToPlan: (data: { id: string, planId: string, token: string }) => Promise<boolean>
	public abstract updateMethodForSubscription: (data: { id: string, token: string }) => Promise<boolean>
	public abstract cancelSubscription: (data: { id: string }) => Promise<boolean>
}
