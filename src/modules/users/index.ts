import { UserFirebaseDataSource } from '@modules/users/data/datasources/user-firebase'
import { UserTransformer } from '@modules/users/data/transformers/user'
import { UserRepository } from '@modules/users/data/repositories/user'
import { FindUserUseCase } from '@modules/users/domain/usecases/findUser'
import { GetTutorsUseCase } from '@modules/users/domain/usecases/getTutors'
import { AuthFirebaseDataSource } from '@modules/users/data/datasources/auth-firebase'
import { AuthRepository } from '@modules/users/data/repositories/auth'
import { LoginWithEmailUseCase } from '@modules/users/domain/usecases/loginWithEmail'
import { LoginWithGoogleUseCase } from '@modules/users/domain/usecases/loginWithGoogle'
import { LogoutUseCase } from '@modules/users/domain/usecases/logout'
import { RegisterWithEmailUseCase } from '@modules/users/domain/usecases/registerWithEmail'
import { RegisterAuthChangedCallbackUseCase } from '@modules/users/domain/usecases/registerOnAuthChangedCallback'
import { GetLoginFactoryUseCase } from '@modules/users/domain/usecases/getLoginFactory'
import { GetRegisterFactoryUseCase } from '@modules/users/domain/usecases/getRegisterFactory'
import { GetResetPasswordFactoryUseCase } from '@modules/users/domain/usecases/getResetPasswordFactory'
import { ResetPasswordUseCase } from '@modules/users/domain/usecases/resetPassword'
import { UpdatePasswordUseCase } from '@modules/users/domain/usecases/updatePassword'
import { GetUpdatePasswordFactoryUseCase } from '@modules/users/domain/usecases/getUpdatePasswordFactory'
import { RoleFirebaseDataSource } from '@modules/users/data/datasources/role-firebase'
import { RoleRepository } from '@modules/users/data/repositories/role'
import { MakeAdminUsecase } from '@modules/users/domain/usecases/makeAdmin'
import { MakeTutorUsecase } from '@modules/users/domain/usecases/makeTutor'
import { RemoveAdminUsecase } from '@modules/users/domain/usecases/removeAdmin'
import { GetMailingListFactoryUsecase } from '@modules/users/domain/usecases/getMailingListFactory'
import { SubscribeToMailingListUsecase } from '@modules/users/domain/usecases/subscribeToMailingList'
import { FindUsersByEmailUseCase } from '@modules/users/domain/usecases/findUsersByEmail'
import { UpdateProfileUseCase } from '@modules/users/domain/usecases/updateProfile'
import { GetUpdateProfileFactoryUseCase } from '@modules/users/domain/usecases/getUpdateProfileFactory'

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
