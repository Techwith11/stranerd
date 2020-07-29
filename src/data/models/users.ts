import BaseModel  from '@data/models/base'
import UserEntity from '@root/domains/entities/users'

export interface UsersModelI {  }

export class UsersModel extends UserEntity implements BaseModel<UserEntity, UsersModelI> {
    static fromJSON(json: UsersModelI) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}
