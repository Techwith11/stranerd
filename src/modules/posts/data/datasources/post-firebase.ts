import { FirestoreService, FunctionsService  } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import PostBaseDataSource from '@root/modules/posts/data/datasources/post-base'
import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'

export default class PostFirebaseDataSource implements PostBaseDataSource{

    public async create(data: PostToModel): Promise<string> {
        return await FunctionsService.call('createPost', data) as string
    }

    public async find(id: string): Promise<PostFromModel | undefined> {
        return await FirestoreService.find('posts', id) as PostFromModel | undefined
    }

    public async get(conditions?: GetClauses): Promise<PostFromModel[]> {
        return await FirestoreService.get('posts',conditions) as PostFromModel[]
    }

}
