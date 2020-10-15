import { UserFirebaseDataSource } from './data/datasources/user-firebase'
import { UserTransformer } from './data/transformers/user'
import { UserRepository } from './data/repositories/user'
import { FindUserUseCase } from './domain/usecases/findUser'
import { GetTutorsUseCase } from './domain/usecases/getTutors'
import { AuthFirebaseDataSource } from './data/datasources/auth-firebase'
import { AuthRepository } from './data/repositories/auth'
import { LoginWithEmailUseCase } from './domain/usecases/loginWithEmail'
import { LoginWithGoogleUseCase } from './domain/usecases/loginWithGoogle'
import { LogoutUseCase } from './domain/usecases/logout'
import { RegisterWithEmailUseCase } from './domain/usecases/registerWithEmail'
import { RegisterAuthChangedCallbackUseCase } from './domain/usecases/registerOnAuthChangedCallback'
import { GetLoginFactoryUseCase } from './domain/usecases/getLoginFactory'
import { GetRegisterFactoryUseCase } from './domain/usecases/getRegisterFactory'
import { GetResetPasswordFactoryUseCase } from './domain/usecases/getResetPasswordFactory'
import { ResetPasswordUseCase } from './domain/usecases/resetPassword'
import { UpdatePasswordUseCase } from './domain/usecases/updatePassword'
import { GetUpdatePasswordFactoryUseCase } from './domain/usecases/getUpdatePasswordFactory'
import { RoleFirebaseDataSource } from './data/datasources/role-firebase'
import { RoleRepository } from './data/repositories/role'
import { MakeAdminUsecase } from './domain/usecases/makeAdmin'
import { MakeTutorUsecase } from './domain/usecases/makeTutor'
import { RemoveAdminUsecase } from './domain/usecases/removeAdmin'
import { GetMailingListFactoryUsecase } from './domain/usecases/getMailingListFactory'
import { SubscribeToMailingListUsecase } from './domain/usecases/subscribeToMailingList'
import { FindUsersByEmailUseCase } from './domain/usecases/findUsersByEmail'
import { UpdateProfileUseCase } from './domain/usecases/updateProfile'
import { GetUpdateProfileFactoryUseCase } from './domain/usecases/getUpdateProfileFactory'

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
export const UpdateProfile = new UpdateProfileUseCase(authRepository)
export const GetLoginFactory = new GetLoginFactoryUseCase()
export const GetRegisterFactory = new GetRegisterFactoryUseCase()
export const GetResetPasswordFactory = new GetResetPasswordFactoryUseCase()
export const GetUpdatePasswordFactory = new GetUpdatePasswordFactoryUseCase()
export const GetUpdateProfileFactory = new GetUpdateProfileFactoryUseCase()

export const MakeAdmin = new MakeAdminUsecase(roleRepository)
export const RemoveAdmin = new RemoveAdminUsecase(roleRepository)
export const MakeTutor = new MakeTutorUsecase(roleRepository)
export const SubscribeToMailingList = new SubscribeToMailingListUsecase(roleRepository)
export const GetMailingListFactory = new GetMailingListFactoryUsecase()
