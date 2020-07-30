import BaseTransformer from '@data/transformers/base'
import UserEntity from '@root/domains/entities/users'
import { UserFromModel, UserToModel } from '@data/models/users'

export default class UserTransformer implements BaseTransformer<UserEntity, UserFromModel, UserToModel> {
    public fromJSON(model: UserFromModel) {
        return {  }
    }

    public toJSON(entity: UserEntity) {
        return {  }
    }

}
