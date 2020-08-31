const braintree = require('braintree')
const { environmentVariables } = require('./environment')
const { isProduction } = require('./environment')

const getGateway = () => braintree.connect({
	environment: braintree.Environment[isProduction ? 'Production' : 'Sandbox'],
	merchantId: environmentVariables.braintree.merchantId,
	publicKey: environmentVariables.braintree.publicKey,
	privateKey: environmentVariables.braintree.privateKey
})

module.exports.createCustomer = async (name, email) => await getGateway().customer.create({
	firstName: name, email
})

module.exports.getClientToken = async () => await getGateway().clientToken.generate()

module.exports.createPaymentMethod = async (customerId, paymentMethodNonce) => await getGateway().paymentMethod
	.create({ customerId, paymentMethodNonce })

module.exports.removePaymentMethod = async (token) => await getGateway().paymentMethod.delete(token)

module.exports.makePayment = async (amount, paymentMethodToken) => getGateway().transaction.sale({
	amount, paymentMethodToken
})

module.exports.subscribeToPlan = async (planId, paymentMethodToken) => await getGateway().subscription.create({
	planId, paymentMethodToken
})

module.exports.updatePaymentMethodForSubscription = async (id, paymentMethodToken) => await getGateway().subscription
	.update(id, { paymentMethodToken })

module.exports.cancelSubscription = async (id) => await getGateway().subscription.cancel(id)

module.exports.parseNotification = async ({ bt_signature, bt_payload }) => await getGateway().webhookNotification
	.parse(bt_signature, bt_payload)
