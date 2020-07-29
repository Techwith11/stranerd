import BaseModel  from '@data/models/base'
import UserEntity from '@root/domains/entities/users'

export interface UserModelI {  }

export class UserModel extends UserEntity implements BaseModel<UserEntity, UserModelI> {
    static fromJSON(json: UserModelI) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}
