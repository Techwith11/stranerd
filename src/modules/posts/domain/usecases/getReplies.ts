import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyEntity from '@root/modules/posts/domain/entities/replles'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export default (repository: IReplyRepository) => {
    return async (postId: string, date?: Date) : Promise<ReplyEntity[]> => {
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
        return repository.get(postId, conditions)
    }
}
