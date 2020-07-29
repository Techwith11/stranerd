import BaseRepository from '@data/repositories/base'
import PostModel from '@data/models/posts'
import PostEntity from '@root/domains/entities/posts'

export default class PostsRepository extends BaseRepository<PostEntity, PostModel>{
    protected readonly collectionName = 'posts'
}
