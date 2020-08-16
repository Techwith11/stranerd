import { IPaymentRepository } from '@root/modules/payments/domain/irepositories/ipayment'
import { PaymentBaseDataSource } from '@root/modules/payments/data/datasources/payment-base'

export class PaymentRepository implements IPaymentRepository {
	private readonly dataSource: PaymentBaseDataSource

	constructor(dataSource: PaymentBaseDataSource) {
		this.dataSource = dataSource
	}

	public async cancelSubscription(userId: string) {
		return await this.dataSource.cancelSubscription({ id: userId })
	}

	public async createMethod(userId: string, nonce: string): Promise<boolean> {
		return await this.dataSource.createMethod({ id: userId, nonce })
	}

	public async getClientToken(): Promise<{ braintree: string; paypal: string }> {
		return await this.dataSource.getClientToken()
	}

	public async makePayment(userId: string, amount: string, token: string): Promise<boolean> {
		return await this.dataSource.makePayment({ amount, token, id: userId })
	}

	public async removeMethod(userId: string, methodId: string): Promise<boolean> {
		return await this.dataSource.removeMethod({ user: userId, id: methodId })
	}

	public async subscribeToPlan(userId: string, planId: string, token: string): Promise<boolean> {
		return await this.dataSource.subscribeToPlan({ planId,  token, id: userId })
	}

	public async updateMethodForSubscription(userId: string, token: string): Promise<boolean> {
		return await this.dataSource.updateMethodForSubscription({ id: userId, token })
	}

}
