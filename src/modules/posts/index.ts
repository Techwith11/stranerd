import Bottle from 'bottlejs'
import PostFirebaseDataSource from '@root/modules/posts/data/datasources/post-firebase'
import PostRepository from '@root/modules/posts/data/repositories/post'
import PostTransformer from '@root/modules/posts/data/transformers/post'
import ReplyFirebaseDataSource from '@root/modules/posts/data/datasources/reply-firebase'
import ReplyTransformer from '@root/modules/posts/data/transformers/reply'
import ReplyRepository from '@root/modules/posts/data/repositories/reply'
import { AddPostUseCase } from '@root/modules/posts/domain/usecases/addPost'
import { FindPostUseCase } from '@root/modules/posts/domain/usecases/findPost'
import { GetPostsUseCase } from '@root/modules/posts/domain/usecases/getPosts'
import { GetPostFactoryUseCase } from '@root/modules/posts/domain/usecases/getPostFactory'
import { AddReplyUseCase } from '@root/modules/posts/domain/usecases/addReply'
import { GetRepliesUseCase } from '@root/modules/posts/domain/usecases/getReplies'
import { GetReplyFactoryUseCase } from '@root/modules/posts/domain/usecases/getReplyFactory'

const bottle = new Bottle()

bottle.service('DataSources.Post', PostFirebaseDataSource)
bottle.service('DataSources.Reply', ReplyFirebaseDataSource)

bottle.service('Transformers.Post', PostTransformer)
bottle.service('Transformers.Reply', ReplyTransformer)

bottle.service('Repositories.Post', PostRepository, 'DataSources.Post','Transformers.Post')
bottle.service('Repositories.Reply', ReplyRepository, 'DataSources.Reply','Transformers.Reply')

bottle.service('Usecases.Post.Add', AddPostUseCase, 'Repositories.Post')
bottle.service('Usecases.Post.Find', FindPostUseCase, 'Repositories.Post')
bottle.service('Usecases.Post.Get', GetPostsUseCase, 'Repositories.Post')
bottle.service('Usecases.Post.GetFactory', GetPostFactoryUseCase)
bottle.service('Usecases.Reply.Add', AddReplyUseCase, 'Repositories.Reply')
bottle.service('Usecases.Reply.Get', GetRepliesUseCase, 'Repositories.Reply')
bottle.service('Usecases.Reply.GetFactory', GetReplyFactoryUseCase)

const { Add: addPost, Find: findPost, Get: getPosts, GetFactory: getPostFactory } = bottle.container.Usecases.Post as {
    Add: AddPostUseCase,
    Find: FindPostUseCase,
    Get: GetPostsUseCase,
    GetFactory: GetPostFactoryUseCase
}

const { Add: addReply, Get: getReplies, GetFactory: getReplyFactory } = bottle.container.Usecases.Reply as {
    Add: AddReplyUseCase
    Get: GetRepliesUseCase,
    GetFactory: GetReplyFactoryUseCase
}

export {
    addPost, findPost, getPosts, getPostFactory,
    addReply, getReplies, getReplyFactory
}
