import BaseTransformer from '@data/transformers/base'
import UserEntity from '@root/domains/entities/users'
import UserModel from '@data/models/users'

export default class UserTransformer implements BaseTransformer<UserEntity, UserModel> {
    public fromJSON(model: UserModel) {
        return {  }
    }

    public toJSON(entity: UserEntity) {
        return {  }
    }

}
