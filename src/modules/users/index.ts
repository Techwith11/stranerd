import Bottle from 'bottlejs'
import UserFirebaseDataSource from '@root/modules/users/data/datasources/user-firebase'
import UserTransformer from '@root/modules/users/data/transformers/user'
import UserRepository from '@root/modules/users/data/repositories/user'
import { FindUserUseCase } from '@root/modules/users/domain/usecases/findUser'
import { GetTutorsUseCase } from '@root/modules/users/domain/usecases/getTutors'

const bottle = new Bottle()

bottle.service('DataSources.User', UserFirebaseDataSource)

bottle.service('Transformers.User', UserTransformer)

bottle.service('Repositories.User', UserRepository, 'DataSources.User', 'Transformers.User')

bottle.service('Usecases.User.Find', FindUserUseCase, 'Repositories.User')
bottle.service('Usecases.User.GetTutors', GetTutorsUseCase, 'Repositories.User')

const { Find: FindUser, GetTutors } = bottle.container.Usecases.User as {
	Find: FindUserUseCase, GetTutors: GetTutorsUseCase
}

export {
	FindUser, GetTutors
}
