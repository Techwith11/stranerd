import BaseModel  from '@data/models/base'
import SessionEntity from '@root/domains/entities/users'

export interface SessionModelI {  }

export class SessionModel extends SessionEntity implements BaseModel<SessionEntity, SessionModelI> {
    static fromJSON(json: SessionModelI) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}
