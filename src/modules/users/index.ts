import Bottle from 'bottlejs'
import UserFirebaseDataSource from '@root/modules/users/data/datasources/user-firebase'
import UserTransformer from '@root/modules/users/data/transformers/user'
import UserRepository from '@root/modules/users/data/repositories/user'
import { FindUserUseCase } from '@root/modules/users/domain/usecases/findUser'
import { GetTutorsUseCase } from '@root/modules/users/domain/usecases/getTutors'
import AuthFirebaseDataSource from '@root/modules/users/data/datasources/auth-firebase'
import AuthRepository from '@root/modules/users/data/repositories/auth'
import { LoginWithEmailUseCase } from '@root/modules/users/domain/usecases/loginWithEmail'
import { LoginWithGoogleUseCase } from '@root/modules/users/domain/usecases/loginWithGoogle'
import { LogoutUseCase } from '@root/modules/users/domain/usecases/logout'
import { RegisterWithEmailUseCase } from '@root/modules/users/domain/usecases/registerWithEmail'
import { RegisterAuthChangedCallbackUseCase } from '@root/modules/users/domain/usecases/registerOnAuthChangedCallback'
import { GetLoginFactoryUseCase } from '@root/modules/users/domain/usecases/getLoginFactory'
import { GetRegisterFactoryUseCase } from '@root/modules/users/domain/usecases/getRegisterFactory'

const bottle = new Bottle()

bottle.service('DataSources.User', UserFirebaseDataSource)
bottle.service('DataSources.Auth', AuthFirebaseDataSource)

bottle.service('Transformers.User', UserTransformer)

bottle.service('Repositories.User', UserRepository, 'DataSources.User', 'Transformers.User')
bottle.service('Repositories.Auth', AuthRepository, 'DataSources.Auth')

bottle.service('Usecases.User.Find', FindUserUseCase, 'Repositories.User')
bottle.service('Usecases.User.GetTutors', GetTutorsUseCase, 'Repositories.User')
bottle.service('Usecases.Auth.LoginWithEmail', LoginWithEmailUseCase, 'Repositories.Auth')
bottle.service('Usecases.Auth.LoginWithGoogle', LoginWithGoogleUseCase, 'Repositories.Auth')
bottle.service('Usecases.Auth.Logout', LogoutUseCase, 'Repositories.Auth')
bottle.service('Usecases.Auth.RegisterWithEmail', RegisterWithEmailUseCase, 'Repositories.Auth')
bottle.service('Usecases.Auth.RegisterAuthChangedCB', RegisterAuthChangedCallbackUseCase, 'Repositories.Auth')
bottle.service('Usecases.Auth.GetLoginFactory', GetLoginFactoryUseCase, )
bottle.service('Usecases.Auth.GetRegisterFactory', GetRegisterFactoryUseCase, )

const { Find: FindUser, GetTutors } = bottle.container.Usecases.User as {
	Find: FindUserUseCase, GetTutors: GetTutorsUseCase
}

const {
	LoginWithEmail, LoginWithGoogle, Logout,
	RegisterWithEmail, RegisterAuthChangedCB,
	GetLoginFactory, GetRegisterFactory
} = bottle.container.Usecases.Auth as {
	LoginWithEmail: LoginWithEmailUseCase, LoginWithGoogle: LoginWithGoogleUseCase, Logout: LogoutUseCase,
	RegisterWithEmail: RegisterWithEmailUseCase, RegisterAuthChangedCB: RegisterAuthChangedCallbackUseCase
	GetLoginFactory: GetLoginFactoryUseCase, GetRegisterFactory: GetRegisterFactoryUseCase
}

export {
	FindUser, GetTutors,
	LoginWithEmail, LoginWithGoogle, Logout, RegisterWithEmail, RegisterAuthChangedCB,
	GetLoginFactory, GetRegisterFactory
}
