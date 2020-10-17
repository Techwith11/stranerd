import { connect, Environment, SubscriptionNotification } from 'braintree'
import { environmentVariables } from './environment'
import { isProduction } from './environment'

const getGateway = () => connect({
	environment: Environment[isProduction() ? 'Production' : 'Sandbox'],
	merchantId: environmentVariables.braintree.merchantId,
	publicKey: environmentVariables.braintree.publicKey,
	privateKey: environmentVariables.braintree.privateKey
})

export const createCustomer = async (name: string, email: string) => await getGateway().customer
	.create({ firstName: name, email })

export const getClientToken = async () => await getGateway().clientToken.generate({})

export const createPaymentMethod = async (customerId: string, paymentMethodNonce: string) => await getGateway().paymentMethod
	.create({ customerId, paymentMethodNonce })

export const removePaymentMethod = async (token: string) => await getGateway().paymentMethod.delete(token)

export const makePayment = async (amount: number, paymentMethodToken: string) => getGateway().transaction
	.sale({ amount: amount.toString(), paymentMethodToken })

export const subscribeToPlan = async (planId: string, paymentMethodToken: string) => await getGateway().subscription.create({
	planId, paymentMethodToken
})

export const updatePaymentMethodForSubscription = async (id: string, paymentMethodToken: string) => await getGateway().subscription
	// @ts-ignore TODO: FIx PlanID Issue
	.update(id, { paymentMethodToken })

export const cancelSubscription = async (id: string) => await getGateway().subscription.cancel(id)

type Notification = { bt_signature: string, bt_payload: string }
export const parseNotification = async ({ bt_signature, bt_payload }: Notification) => await getGateway()
	.webhookNotification.parse(bt_signature, bt_payload) as SubscriptionNotification
