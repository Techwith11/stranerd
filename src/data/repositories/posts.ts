import BaseRepository from '@data/repositories/base'
import PostModel from '@data/models/posts'

export default class PostsRepository extends BaseRepository<PostModel>{
    protected readonly collectionName = 'posts'
}
