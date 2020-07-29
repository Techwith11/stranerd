import BaseModel  from '@data/models/base'
import PostEntity from '@root/domains/entities/users'

export interface PostModelI {  }

export class PostModel extends PostEntity implements BaseModel<PostEntity, PostModelI> {
    static fromJSON(json: PostModelI) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}
