import { GetClauses } from '@root/modules/core/data/datasources/base'
import ReplyBaseDataSource from '@root/modules/posts/data/datasources/reply-base'
import ReplyTransformer from '@root/modules/posts/data/transformers/reply'
import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'

export default class ReplyRepository implements IReplyRepository{
    private dataSource: ReplyBaseDataSource
    private transformer: ReplyTransformer

    constructor(dataSource: ReplyBaseDataSource, transformer: ReplyTransformer) {
        this.dataSource = dataSource
        this.transformer = transformer
    }

    public async add(postId: string, data: ReplyToModel) {
        return await this.dataSource.create(postId, data)
    }

    public async get(postId: string, conditions?: GetClauses) {
        const models = await this.dataSource.get(postId, conditions)
        return models.map((model: ReplyFromModel) => this.transformer.fromJSON(model))
    }

}
