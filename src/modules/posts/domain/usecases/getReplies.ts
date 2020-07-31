import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyEntity from '@root/modules/posts/domain/entities/replles'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetRepliesUseCase {
    private repository: IReplyRepository

    constructor(repository: IReplyRepository) {
        this.repository = repository
    }


    public async call (postId: string, date?: Date) :Promise<ReplyEntity[]> {
        const conditions: GetClauses = {
            order: {
                field: 'dates.createdAt',
                desc: true
            },
            limit: 24
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
        return this.repository.get(postId, conditions)
    }
}


