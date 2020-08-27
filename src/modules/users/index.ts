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

const userDataSource = new UserFirebaseDataSource()
const authDataSource = new AuthFirebaseDataSource()

const userTransformer = new UserTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const authRepository = new AuthRepository(authDataSource)

export const FindUser = new FindUserUseCase(userRepository)
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
