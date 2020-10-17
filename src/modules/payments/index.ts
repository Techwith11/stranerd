import { PaymentFirebaseDataSource } from './data/datasources/payment-firebase'
import { PaymentRepository } from './data/repositories/payment'
import { GetClientTokenUsecase } from './domain/usecases/getClientToken'
import { CreatePaymentMethodUsecase } from './domain/usecases/createPaymentMethod'
import { RemovePaymentMethodUsecase } from './domain/usecases/removePaymentMethod'
import { SubscribeToPlanUsecase } from './domain/usecases/subscribeToPlan'
import { CancelSubscriptionUsecase } from './domain/usecases/cancelSubscription'
import { UpdatePaymentMethodForSubscriptionUsecase } from './domain/usecases/updatePaymentMethodForSubscription'
import { MakePaymentUsecase } from './domain/usecases/makePayment'
import { MethodFirebaseDataSource } from './data/datasources/method-firebase'
import { MethodTransformer } from './data/transformers/method'
import { MethodRepository } from './data/repositories/method'
import { GetPaymentMethodsUsecase } from './domain/usecases/getPaymentMethods'
import { PlanFirebaseDataSource } from './data/datasources/plan-firebase'
import { PlanTransformer } from './data/transformers/plan'
import { PlanRepository } from './data/repositories/plan'
import { GetSubscriptionPlansUsecase } from './domain/usecases/getSubscriptionPlans'
import { TransactionFirebaseDataSource } from './data/datasources/transaction-firebase'
import { TransactionTransformer } from './data/transformers/transaction'
import { TransactionRepository } from './data/repositories/transaction'
import { GetTransactionsUsecase } from './domain/usecases/getTransactions'

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
