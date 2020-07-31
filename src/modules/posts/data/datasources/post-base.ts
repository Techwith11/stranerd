import { GetClauses } from '@root/core/data/datasources/base'
import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'

export default abstract class PostBaseDataSource {
    public abstract create: (data: PostToModel) => Promise<string>
    public abstract get: (condition?: GetClauses) => Promise<PostFromModel[]>
    public abstract find: (id: string) => Promise<PostFromModel | undefined>
}
