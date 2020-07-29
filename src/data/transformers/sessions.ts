import BaseTransformer from '@data/transformers/base'
import SessionEntity from '@root/domains/entities/sessions'
import SessionModel from '@data/models/sessions'

export default class SessionTransformer implements BaseTransformer<SessionEntity, SessionModel> {
    public fromJSON(model: SessionModel) {
        return {  }
    }

    public toJSON(entity: SessionEntity) {
        return {  }
    }

}
