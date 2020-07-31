import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export default (repository: IPostRepository) => {
    return async (id: string, date?: Date) : Promise<PostEntity[]> => {
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
        return repository.get(conditions)
    }
}