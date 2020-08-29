const functions = require('firebase-functions')
const braintree = require('braintree')
const { isProduction } = require('./environment')
const environment = functions.config().environment.mode

const getGateway = () => braintree.connect({
	environment: braintree.Environment[isProduction ? 'Production' : 'Sandbox'],
	merchantId: functions.config().braintree[environment]['merchant_id'],
	publicKey: functions.config().braintree[environment]['public_key'],
	privateKey: functions.config().braintree[environment]['private_key']
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
