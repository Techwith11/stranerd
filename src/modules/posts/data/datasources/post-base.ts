import { GetClauses } from '@root/modules/core/data/datasources/base'
import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'

export default abstract class PostBaseDataSource {
    public abstract create: (data: PostToModel) => Promise<string>
    public abstract get: (condition?: GetClauses) => Promise<PostFromModel[]>
    public abstract listen: (callback: (documents: PostFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
    public abstract find: (id: string) => Promise<PostFromModel | undefined>
}
