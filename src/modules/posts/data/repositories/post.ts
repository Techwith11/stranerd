import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostBaseDataSource from '@root/modules/posts/data/datasources/post-base'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import PostTransformer from '@root/modules/posts/data/transformers/post'
import { PostFromModel, PostToModel } from '@root/modules/posts/data/models/post'

export default class PostRepository implements IPostRepository{
    private dataSource: PostBaseDataSource
    private transformer: PostTransformer

    constructor(dataSource: PostBaseDataSource, transformer: PostTransformer) {
        this.dataSource = dataSource
        this.transformer = transformer
    }

    public async add(data: PostToModel) {
        return await this.dataSource.create(data)
    }

    public async find(id: string) {
        const model = await this.dataSource.find(id)
        if(model) return this.transformer.fromJSON(model)
        else return undefined
    }

    public async get(conditions?: GetClauses) {
        const models = await this.dataSource.get(conditions)
        return models.map((model: PostFromModel) => this.transformer.fromJSON(model))
    }

}
