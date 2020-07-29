import BaseRepository from '@data/repositories/base'
import SessionModel from '@data/models/sessions'
import SessionEntity from '@root/domains/entities/sessions'

export default class SessionsRepository extends BaseRepository<SessionEntity, SessionModel>{
    protected readonly collectionName = 'sessions'
}
