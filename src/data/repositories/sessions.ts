import BaseRepository from '@data/repositories/base'
import { SessionFromModel, SessionToModel } from '@data/models/sessions'
import SessionEntity from '@root/domains/entities/sessions'

export default class SessionsRepository extends BaseRepository<SessionEntity, SessionFromModel, SessionToModel>{
    protected readonly collectionName = 'sessions'
}
