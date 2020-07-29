import BaseRepository from '@data/repositories/base'
import SessionModel from '@data/models/sessions'

export default class SessionsRepository extends BaseRepository<SessionModel>{
    protected readonly collectionName = 'sessions'
}
