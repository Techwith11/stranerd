import { PostFirebaseDataSource } from '@modules/posts/data/datasources/post-firebase'
import { PostRepository } from '@modules/posts/data/repositories/post'
import { PostTransformer } from '@modules/posts/data/transformers/post'
import { ReplyFirebaseDataSource } from '@modules/posts/data/datasources/reply-firebase'
import { ReplyTransformer } from '@modules/posts/data/transformers/reply'
import { ReplyRepository } from '@modules/posts/data/repositories/reply'
import { AddPostUseCase } from '@modules/posts/domain/usecases/addPost'
import { FindPostUseCase } from '@modules/posts/domain/usecases/findPost'
import { GetPostsUseCase } from '@modules/posts/domain/usecases/getPosts'
import { GetPostFactoryUseCase } from '@modules/posts/domain/usecases/getPostFactory'
import { AddReplyUseCase } from '@modules/posts/domain/usecases/addReply'
import { GetReplyFactoryUseCase } from '@modules/posts/domain/usecases/getReplyFactory'
import { ListenToPostsUseCase } from '@modules/posts/domain/usecases/listenToPosts'
import { ListenToRepliesUseCase } from '@modules/posts/domain/usecases/listenToReplies'
import { UpvoteReplyUseCase } from '@modules/posts/domain/usecases/upvoteReply'
import { DownvoteReplyUseCase } from '@modules/posts/domain/usecases/downvoteReply'

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
export const UpvoteReply = new UpvoteReplyUseCase(replyRepository)
export const DownvoteReply = new DownvoteReplyUseCase(replyRepository)
export const GetReplyFactory = new GetReplyFactoryUseCase()
