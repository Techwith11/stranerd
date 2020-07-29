import BaseRepository from '@data/repositories/base'
import UserModel from '@data/models/users'

export default class UsersRepository extends BaseRepository<UserModel>{
    protected readonly collectionName = 'users'
}
