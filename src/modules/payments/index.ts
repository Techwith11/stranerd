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
import { MethodFirebaseDataSource } from '@root/modules/payments/data/datasources/method-firebase'
import { MethodTransformer } from '@root/modules/payments/data/transformers/method'
import { MethodRepository } from '@root/modules/payments/data/repositories/method'
import { GetPaymentMethodsUsecase } from '@root/modules/payments/domain/usecases/getPaymentMethods'
import { PlanFirebaseDataSource } from '@root/modules/payments/data/datasources/plan-firebase'
import { PlanTransformer } from '@root/modules/payments/data/transformers/plan'
import { PlanRepository } from '@root/modules/payments/data/repositories/plan'
import { GetSubscriptionPlansUsecase } from '@root/modules/payments/domain/usecases/getSubscriptionPlans'

const bottle = new Bottle()

bottle.service('DataSources.Payment', PaymentFirebaseDataSource)
bottle.service('DataSources.Method', MethodFirebaseDataSource)
bottle.service('DataSources.Plan', PlanFirebaseDataSource)

bottle.service('Transformers.Method', MethodTransformer)
bottle.service('Transformers.Plan', PlanTransformer)

bottle.service('Repositories.Payment', PaymentRepository, 'DataSources.Payment')
bottle.service('Repositories.Method', MethodRepository, 'DataSources.Method', 'Transformers.Method')
bottle.service('Repositories.Plan', PlanRepository, 'DataSources.Plan', 'Transformers.Plan')

bottle.service('Usecases.Payment.GetClientToken', GetClientTokenUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.CreatePaymentMethod', CreatePaymentMethodUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.RemovePaymentMethod', RemovePaymentMethodUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.MakePayment', MakePaymentUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.SubscribeToPlan', SubscribeToPlanUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.CancelSubscription', CancelSubscriptionUsecase, 'Repositories.Payment')
bottle.service('Usecases.Payment.UpdateSubscription', UpdatePaymentMethodForSubscriptionUsecase, 'Repositories.Payment')

bottle.service('Usecases.Method.Get', GetPaymentMethodsUsecase, 'Repositories.Method')

bottle.service('Usecases.Plan.Get', GetSubscriptionPlansUsecase, 'Repositories.Plan')

const {
	GetClientToken, CreatePaymentMethod, RemovePaymentMethod, MakePayment, SubscribeToPlan, UpdateSubscription, CancelSubscription
} = bottle.container.Usecases.Payment as {
	GetClientToken: GetClientTokenUsecase, CreatePaymentMethod: CreatePaymentMethodUsecase, RemovePaymentMethod: RemovePaymentMethodUsecase,
	MakePayment: MakePaymentUsecase, SubscribeToPlan: SubscribeToPlanUsecase, CancelSubscription: CancelSubscriptionUsecase,
	UpdateSubscription: UpdatePaymentMethodForSubscriptionUsecase
}

const {
	Get: GetPaymentMethods
} = bottle.container.Usecases.Method as {
	Get: GetPaymentMethodsUsecase
}

const {
	Get: GetSubscriptionPlans
} = bottle.container.Usecases.Plan as {
	Get: GetSubscriptionPlansUsecase
}

export {
	GetClientToken, CreatePaymentMethod, RemovePaymentMethod, MakePayment, SubscribeToPlan, UpdateSubscription, CancelSubscription,
	GetPaymentMethods,
	GetSubscriptionPlans
}
