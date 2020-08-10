import Bottle from 'bottlejs'
import UserFirebaseDataSource from '@root/modules/users/data/datasources/user-firebase'
import UserTransformer from '@root/modules/users/data/transformers/user'
import UserRepository from '@root/modules/users/data/repositories/user'

const bottle = new Bottle()

bottle.service('DataSources.User', UserFirebaseDataSource)

bottle.service('Transformers.User', UserTransformer)

bottle.service('Repositories.User', UserRepository, 'DataSources.User', 'Transformers.User')
