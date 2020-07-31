import Bottle from 'bottlejs'
import PostFirebaseDataSource from '@root/modules/posts/data/datasources/post-firebase'
import PostRepository from '@root/modules/posts/data/repositories/post'
import AddPost from '@root/modules/posts/domain/usecases/addPost'
import FindPost from '@root/modules/posts/domain/usecases/findPost'
import GetPosts from '@root/modules/posts/domain/usecases/getPosts'
import GetPostFactory from '@root/modules/posts/domain/usecases/getFactory'
import PostTransformer from '@root/modules/posts/data/transformers/post'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { PostToModel } from '@root/modules/posts/data/models/post'
import PostFactory from '@root/modules/posts/domain/factories/post'

const bottle = new Bottle()

bottle.service('DataSources.Post', PostFirebaseDataSource)

bottle.service('Transformers.Post', PostTransformer)

bottle.service('Repositories.Post', PostRepository, 'DataSources.Post','Transformers.Post')

bottle.service('Usecases.Post.Add', AddPost, 'Repositories.Post')
bottle.service('Usecases.Post.Find', FindPost, 'Repositories.Post')
bottle.service('Usecases.Post.Get', GetPosts, 'Repositories.Post')
bottle.service('Usecases.Post.GetFactory', GetPostFactory)


const { Add: addPost, Find: findPost, Get: getPosts, GetFactory: getPostFactory } = bottle.container.Usecases.Post as {
    Add: (data: PostToModel) => Promise<string>,
    Find: (id: string) => Promise<PostEntity | undefined>,
    Get: () => Promise<PostEntity[]>,
    GetFactory: () => PostFactory
}

export {
    addPost, findPost, getPosts, getPostFactory
}
