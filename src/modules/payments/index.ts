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
import { TransactionFirebaseDataSource } from '@root/modules/payments/data/datasources/transaction-firebase'
import { TransactionTransformer } from '@root/modules/payments/data/transformers/transaction'
import { TransactionRepository } from '@root/modules/payments/data/repositories/transaction'
import { GetTransactionsUsecase } from '@root/modules/payments/domain/usecases/getTransactions'

const paymentDataSource = new PaymentFirebaseDataSource()
const methodDataSource = new MethodFirebaseDataSource()
const transactionDataSource = new TransactionFirebaseDataSource()
const planDataSource = new PlanFirebaseDataSource()

const methodTransformer = new MethodTransformer()
const transactionTransformer = new TransactionTransformer()
const planTransformer = new PlanTransformer()

const paymentRepository = new PaymentRepository(paymentDataSource)
const methodRepository = new MethodRepository(methodDataSource, methodTransformer)
const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)
const planRepository = new PlanRepository(planDataSource, planTransformer)


export const GetClientToken = new GetClientTokenUsecase(paymentRepository)
export const CreatePaymentMethod = new CreatePaymentMethodUsecase(paymentRepository)
export const RemovePaymentMethod = new RemovePaymentMethodUsecase(paymentRepository)
export const MakePayment = new MakePaymentUsecase(paymentRepository)
export const SubscribeToPlan = new SubscribeToPlanUsecase(paymentRepository)
export const UpdateSubscription = new UpdatePaymentMethodForSubscriptionUsecase(paymentRepository)
export const CancelSubscription = new CancelSubscriptionUsecase(paymentRepository)

export const GetPaymentMethods = new GetPaymentMethodsUsecase(methodRepository)

export const GetTransactions = new GetTransactionsUsecase(transactionRepository)

export const GetSubscriptionPlans = new GetSubscriptionPlansUsecase(planRepository)
