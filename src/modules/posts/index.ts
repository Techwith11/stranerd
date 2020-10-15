import { PostFirebaseDataSource } from './data/datasources/post-firebase'
import { PostRepository } from './data/repositories/post'
import { PostTransformer } from './data/transformers/post'
import { ReplyFirebaseDataSource } from './data/datasources/reply-firebase'
import { ReplyTransformer } from './data/transformers/reply'
import { ReplyRepository } from './data/repositories/reply'
import { AddPostUseCase } from './domain/usecases/addPost'
import { FindPostUseCase } from './domain/usecases/findPost'
import { GetPostsUseCase } from './domain/usecases/getPosts'
import { GetPostFactoryUseCase } from './domain/usecases/getPostFactory'
import { AddReplyUseCase } from './domain/usecases/addReply'
import { GetReplyFactoryUseCase } from './domain/usecases/getReplyFactory'
import { ListenToPostsUseCase } from './domain/usecases/listenToPosts'
import { ListenToRepliesUseCase } from './domain/usecases/listenToReplies'
import { DislikeReplyUseCase } from '@modules/posts/domain/usecases/dislikeReply'
import { LikeReplyUseCase } from '@modules/posts/domain/usecases/likeReply'

const postDataSource = new PostFirebaseDataSource()
const replyDataSource = new ReplyFirebaseDataSource()

const postTransformer = new PostTransformer()
const replyTransformer = new ReplyTransformer()

const postRepository = new PostRepository(postDataSource, postTransformer)
const replyRepository = new ReplyRepository(replyDataSource, replyTransformer)

export const AddPost = new AddPostUseCase(postRepository)
export const FindPost = new FindPostUseCase(postRepository)
export const GetPosts = new GetPostsUseCase(postRepository)
export const ListenToPosts = new ListenToPostsUseCase(postRepository)
export const GetPostFactory = new GetPostFactoryUseCase()

export const AddReply = new AddReplyUseCase(replyRepository)
export const ListenToReplies = new ListenToRepliesUseCase(replyRepository)
export const LikeReply = new LikeReplyUseCase(replyRepository)
export const DislikeReply = new DislikeReplyUseCase(replyRepository)
export const GetReplyFactory = new GetReplyFactoryUseCase()
