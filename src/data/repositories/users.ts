import BaseRepository from '@data/repositories/base'
import { UserFromModel, UserToModel } from '@data/models/users'
import UserEntity from '@root/domains/entities/users'

export default class UsersRepository extends BaseRepository<UserEntity, UserFromModel, UserToModel>{
    protected readonly collectionName = 'users'
}
