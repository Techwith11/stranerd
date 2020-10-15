import { PaymentFirebaseDataSource } from '@modules/payments/data/datasources/payment-firebase'
import { PaymentRepository } from '@modules/payments/data/repositories/payment'
import { GetClientTokenUsecase } from '@modules/payments/domain/usecases/getClientToken'
import { CreatePaymentMethodUsecase } from '@modules/payments/domain/usecases/createPaymentMethod'
import { RemovePaymentMethodUsecase } from '@modules/payments/domain/usecases/removePaymentMethod'
import { SubscribeToPlanUsecase } from '@modules/payments/domain/usecases/subscribeToPlan'
import { CancelSubscriptionUsecase } from '@modules/payments/domain/usecases/cancelSubscription'
import { UpdatePaymentMethodForSubscriptionUsecase } from '@modules/payments/domain/usecases/updatePaymentMethodForSubscription'
import { MakePaymentUsecase } from '@modules/payments/domain/usecases/makePayment'
import { MethodFirebaseDataSource } from '@modules/payments/data/datasources/method-firebase'
import { MethodTransformer } from '@modules/payments/data/transformers/method'
import { MethodRepository } from '@modules/payments/data/repositories/method'
import { GetPaymentMethodsUsecase } from '@modules/payments/domain/usecases/getPaymentMethods'
import { PlanFirebaseDataSource } from '@modules/payments/data/datasources/plan-firebase'
import { PlanTransformer } from '@modules/payments/data/transformers/plan'
import { PlanRepository } from '@modules/payments/data/repositories/plan'
import { GetSubscriptionPlansUsecase } from '@modules/payments/domain/usecases/getSubscriptionPlans'
import { TransactionFirebaseDataSource } from '@modules/payments/data/datasources/transaction-firebase'
import { TransactionTransformer } from '@modules/payments/data/transformers/transaction'
import { TransactionRepository } from '@modules/payments/data/repositories/transaction'
import { GetTransactionsUsecase } from '@modules/payments/domain/usecases/getTransactions'

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
