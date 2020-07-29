import BaseTransformer from '@data/transformers/base'
import PostEntity from '@root/domains/entities/posts'
import PostModel from '@data/models/posts'

export default class PostTransformer implements BaseTransformer<PostEntity, PostModel> {
    public fromJSON(model: PostModel) {
        return {  }
    }

    public toJSON() {
        return {  }
    }

}
