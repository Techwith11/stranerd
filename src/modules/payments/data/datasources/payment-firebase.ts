import { PaymentBaseDataSource } from '@modules/payments/data/datasources/payment-base'
import { FunctionsService } from '@modules/core/services/firebase'

export class PaymentFirebaseDataSource implements PaymentBaseDataSource{
	public async getClientToken(): Promise<{ braintree: string; paypal: string }> {
		return await FunctionsService.call('getClientToken', {})
	}

	public async createMethod(data: { id: string, nonce: string }): Promise<{  success: boolean, token: string | undefined}> {
		return await FunctionsService.call('createPaymentMethod', data)
	}

	public async removeMethod(data: { user: string, id: string }): Promise<boolean> {
		return await FunctionsService.call('removePaymentMethod', data)
	}

	public async makePayment(data: { id: string, amount: number, token: string }): Promise<boolean> {
		return await FunctionsService.call('makePayment', data)
	}

	public async subscribeToPlan(data: { id: string, planId: string, token: string }): Promise<boolean> {
		return await FunctionsService.call('subscribeToPlan', data)
	}

	public async cancelSubscription(data: { id: string }): Promise<boolean> {
		return await FunctionsService.call('cancelSubscription', data)
	}

	public async updateMethodForSubscription(data: { id: string, token: string }): Promise<boolean> {
		return await FunctionsService.call('updatePaymentMethodForSubscription', data)
	}

}
