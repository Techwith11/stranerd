import Bottle from 'bottlejs'
import { PaymentFirebaseDataSource } from '@root/modules/payments/data/datasources/payment-firebase'
import { PaymentRepository } from '@root/modules/payments/data/repositories/payment'
import { GetClientTokenUsecase } from '@root/modules/payments/domain/usecases/getClientToken'
import { CreatePaymentMethodUsecase } from '@root/modules/payments/domain/usecases/createPaymentMethod'
import { RemovePaymentMethodUsecase } from '@root/modules/payments/domain/usecases/removePaymentMethod'
import { SubscribeToPlanUsecase } from '@root/modules/payments/domain/usecases/subscribeToPlan'
import { CancelSubscriptionUsecase } from '@root/modules/payments/domain/usecases/cancelSubscription'
import { UpdatePaymentMethodForSubscriptionUsecase } from '@root/modules/payments/domain/usecases/updatePaymentMethodForSubscription'
import { MakePaymentUsecase } from '@root/modules/payments/domain/usecases/makePayment'

const bottle = new Bottle()

bottle.service('DataSources.Payment', PaymentFirebaseDataSource)

bottle.service('Repositories.Payment', PaymentRepository, 'DataSources.Payment')

bottle.service('Usecases.Payment.GetClientToken', GetClientTokenUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.CreatePaymentMethod', CreatePaymentMethodUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.RemovePaymentMethod', RemovePaymentMethodUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.MakePayment', MakePaymentUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.SubscribeToPlan', SubscribeToPlanUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.CancelSubscription', CancelSubscriptionUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.UpdateSubscription', UpdatePaymentMethodForSubscriptionUsecase, 'Repositories.Payment')

const {
	GetClientToken, CreatePaymentMethod, RemovePaymentMethod, MakePayment, SubscribeToPlan, UpdateSubscription, CancelSubscription
} = bottle.container.Usecases.Payment as {
	GetClientToken: GetClientTokenUsecase, CreatePaymentMethod: CreatePaymentMethodUsecase, RemovePaymentMethod: RemovePaymentMethodUsecase,
	MakePayment: MakePaymentUsecase, SubscribeToPlan: SubscribeToPlanUsecase, CancelSubscription: CancelSubscriptionUsecase,
	UpdateSubscription: UpdatePaymentMethodForSubscriptionUsecase
}

export {
	GetClientToken, CreatePaymentMethod, RemovePaymentMethod, MakePayment, SubscribeToPlan, UpdateSubscription, CancelSubscription
}
