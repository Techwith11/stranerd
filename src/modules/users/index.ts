import { UserFirebaseDataSource } from '@root/modules/users/data/datasources/user-firebase'
import { UserTransformer } from '@root/modules/users/data/transformers/user'
import { UserRepository } from '@root/modules/users/data/repositories/user'
import { FindUserUseCase } from '@root/modules/users/domain/usecases/findUser'
import { GetTutorsUseCase } from '@root/modules/users/domain/usecases/getTutors'
import { AuthFirebaseDataSource } from '@root/modules/users/data/datasources/auth-firebase'
import { AuthRepository } from '@root/modules/users/data/repositories/auth'
import { LoginWithEmailUseCase } from '@root/modules/users/domain/usecases/loginWithEmail'
import { LoginWithGoogleUseCase } from '@root/modules/users/domain/usecases/loginWithGoogle'
import { LogoutUseCase } from '@root/modules/users/domain/usecases/logout'
import { RegisterWithEmailUseCase } from '@root/modules/users/domain/usecases/registerWithEmail'
import { RegisterAuthChangedCallbackUseCase } from '@root/modules/users/domain/usecases/registerOnAuthChangedCallback'
import { GetLoginFactoryUseCase } from '@root/modules/users/domain/usecases/getLoginFactory'
import { GetRegisterFactoryUseCase } from '@root/modules/users/domain/usecases/getRegisterFactory'
import { GetResetPasswordFactoryUseCase } from '@root/modules/users/domain/usecases/getResetPasswordFactory'
import { ResetPasswordUseCase } from '@root/modules/users/domain/usecases/resetPassword'
import { UpdatePasswordUseCase } from '@root/modules/users/domain/usecases/updatePassword'
import { GetUpdatePasswordFactoryUseCase } from '@root/modules/users/domain/usecases/getUpdatePasswordFactory'
import { RoleFirebaseDataSource } from '@root/modules/users/data/datasources/role-firebase'
import { RoleRepository } from '@root/modules/users/data/repositories/role'
import { MakeAdminUsecase } from '@root/modules/users/domain/usecases/makeAdmin'
import { MakeTutorUsecase } from '@root/modules/users/domain/usecases/makeTutor'
import { RemoveAdminUsecase } from '@root/modules/users/domain/usecases/removeAdmin'
import { GetMailingListFactoryUsecase } from '@root/modules/users/domain/usecases/getMailingListFactory'
import { SubscribeToMailingListUsecase } from '@root/modules/users/domain/usecases/subscribeToMailingList'
import { FindUsersByEmailUseCase } from '@root/modules/users/domain/usecases/findUsersByEmail'

const userDataSource = new UserFirebaseDataSource()
const authDataSource = new AuthFirebaseDataSource()
const roleDataSource = new RoleFirebaseDataSource()

const userTransformer = new UserTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const authRepository = new AuthRepository(authDataSource)
const roleRepository = new RoleRepository(roleDataSource)

export const FindUser = new FindUserUseCase(userRepository)
export const FindUsersByEmail = new FindUsersByEmailUseCase(userRepository)
export const GetTutors = new GetTutorsUseCase(userRepository)

export const LoginWithEmail = new LoginWithEmailUseCase(authRepository)
export const LoginWithGoogle = new LoginWithGoogleUseCase(authRepository)
export const Logout = new LogoutUseCase(authRepository)
export const RegisterWithEmail = new RegisterWithEmailUseCase(authRepository)
export const RegisterAuthChangedCB = new RegisterAuthChangedCallbackUseCase(authRepository)
export const ResetPassword = new ResetPasswordUseCase(authRepository)
export const UpdatePassword = new UpdatePasswordUseCase(authRepository)
export const GetLoginFactory = new GetLoginFactoryUseCase()
export const GetRegisterFactory = new GetRegisterFactoryUseCase()
export const GetResetPasswordFactory = new GetResetPasswordFactoryUseCase()
export const GetUpdatePasswordFactory = new GetUpdatePasswordFactoryUseCase()

export const MakeAdmin = new MakeAdminUsecase(roleRepository)
export const RemoveAdmin = new RemoveAdminUsecase(roleRepository)
export const MakeTutor = new MakeTutorUsecase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUsecase(roleRepository)
export const GetMailingListFactory = new GetMailingListFactoryUsecase()
