import BaseRepository from '@data/repositories/base'
import { PostFromModel, PostToModel } from '@data/models/posts'
import PostEntity from '@root/domains/entities/posts'

export default class PostsRepository extends BaseRepository<PostEntity, PostFromModel, PostToModel>{
    protected readonly collectionName = 'posts'
}
