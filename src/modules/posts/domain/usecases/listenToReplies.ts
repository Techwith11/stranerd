import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyEntity from '@root/modules/posts/domain/entities/replles'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class ListenToRepliesUseCase {
    private repository: IReplyRepository

    constructor(repository: IReplyRepository) {
        this.repository = repository
    }

    public async call (postId: string, callback: (entities: ReplyEntity[]) => void, date?: Date) :Promise<() => void > {
        const conditions: GetClauses = {
            order: {
                field: 'dates.createdAt',
                desc: true
            },
            limit: process.env.VUE_APP_PAGINATION_LIMIT
        }
        if(date){
            conditions.where = [
                {
                    field: 'dates.createdAt',
                    condition: '>',
                    value: date
                }
            ]
        }
        return this.repository.listen(postId,callback, conditions)
    }

}

