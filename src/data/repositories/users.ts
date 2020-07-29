import BaseRepository from '@data/repositories/base'
import UserModel from '@data/models/users'
import UserEntity from '@root/domains/entities/users'

export default class UsersRepository extends BaseRepository<UserEntity, UserModel>{
    protected readonly collectionName = 'users'
}
